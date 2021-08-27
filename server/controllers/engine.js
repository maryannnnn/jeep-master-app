const Engine = require("../models/engine");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    res.json(await new Engine({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create engine failed");
  }
};

exports.list = async (req, res) =>
  res.json(await Engine.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let engine = await Engine.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  const products = await Product.find({ engine }).populate("engine").exec();

  res.json({
    emgine,
    products,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Engine.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Engine update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Engine.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Engine delete failed");
  }
};


