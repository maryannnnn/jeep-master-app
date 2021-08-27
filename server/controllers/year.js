const Year = require("../models/year");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    res.json(await new Year({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create year failed");
  }
};

exports.list = async (req, res) =>
  res.json(await Year.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let year = await Year.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  const products = await Product.find({ year }).populate("year").exec();

  res.json({
    year,
    products,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Year.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("year update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Year.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Year delete failed");
  }
};


