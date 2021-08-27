const Model = require("../models/model");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    res.json(await new Model({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create model failed");
  }
};

exports.list = async (req, res) =>
  res.json(await Model.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let model = await Model.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  const products = await Product.find({ model }).populate("model").exec();

  res.json({
    model,
    products,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Model.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Model update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Model.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Model delete failed");
  }
};


