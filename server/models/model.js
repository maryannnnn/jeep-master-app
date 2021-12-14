const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [120, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
      image:{
          type: String,
          default:'ren.jpg'
      }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Model", modelSchema);
