const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 120,
      text: true,
    },
    titleshort: {
      type: String,
      required: true,
      maxlength: 70,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    articul: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    metadescription: {
      type: String,
      maxlength: 2000,
    },
    metakeyword: {
      type: String,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    brand: {
      type: String,
      enum: ["Jeep", "Chrysler", "Dodge"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    model: [
      {
        type: ObjectId,
        ref: "Model",
      }
    ],
    numberorigional: { 
      type: String,
      maxlength: 200, 
    },
    numberproduser: { 
      type: String,
      maxlength: 200, 
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    wait: { 
      type: Number,
      default: 0, 
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    material: {
      type: String,
      enum: ["Сталь", "Пластмасса", "Стекло", "Войлок", "Керамика"],
    },
    color: {
      type: String,
      enum: ["Черный", "Коричневый", "Silver", "Белый", "Голубой", "Серый металлик", "Гранитно-серый металлик", "Хром"],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
