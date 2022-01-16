const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: "Sorry. Wrong URL image",
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: "Sorry. Wrong URL image",
      },
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
      select: false,
    },
  },
  {
    versionKey: false, // set to false then it wont create in mongodb
  },
);

module.exports = mongoose.model("article", articleSchema);