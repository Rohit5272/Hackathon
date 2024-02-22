const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  packSize: { type: String, required: true },
  MRP: { type: Number, required: true },
  image: { type: String }, // image URLs
  status: { type: Boolean, required: true},
  category: {
    type: String,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
