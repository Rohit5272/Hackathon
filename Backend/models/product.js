const mongoose = require("mongoose");
const category = require("./category");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  packSize: { type: String, required: true },
  MRP: { type: Number, required: true },
  status: { type: Boolean, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
