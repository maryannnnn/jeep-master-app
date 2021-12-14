const Year = require("../models/year");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(await new Year({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    console.log("SYEAR CREATE ERR ----->", err);
    res.status(400).send("Create year failed");
  }
};

exports.list = async (req, res) =>
  res.json(await Year.find({}).sort({ createdAt: -1 }).exec());


  exports.read = async (req, res) => {
    let years = await Year.find({ parent: req.params.slug }).exec();
    res.json(
      years
    );

    // Year.find({ parent: req.params.slug }).exec((err, years) => {
    //   if (err) console.log(err);
    //   res.json(years);
    // });
    
  };

  

exports.readAndProducts = async (req, res) => {
  let year = await Year.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ years: year })
    .populate("model")
    .exec();

  res.json({
    year,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Year.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Year update failed");
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

