const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  packSize: { type: String, required: true },
  MRP: { type: Number, required: true },
  status: { type: Boolean, required: true },
  category: {
    type: String,
    ref: "Category",
  },
});

module.exports = mongoose.model("Product", productSchema);
