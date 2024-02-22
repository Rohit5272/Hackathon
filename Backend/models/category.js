const mongoose = require("mongoose");

const category = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean,require:true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("category", category);
