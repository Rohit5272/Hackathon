const Product = require("../models/product");
const Category = require("../models/category");

// Create
exports.createProduct = (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  const product = new Product({
    name: req.body.name,
    image: url + "/public/" + req.file.filename,
    packSize: req.body.packSize,
    MRP: req.body.MRP,
    status: req.body.status,
    category: req.body.category,
  });

  product
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Product created successfully!",
        product: data,
      });
    })
    .catch((err) => {
      console.error("Error creating product:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Internal server error" });
      }
    });
};


// Get All Products
exports.getProducts = (req, res) => {
  Product.find()
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      res.status(500).json("Not found");
    });
};

// Get Single Product
exports.getSingleProduct = (req, res) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// Product Delete
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "deleted Successfully", product });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  let updateData = req.body;

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    updateData.image = url + "/public/" + req.file.filename;
  }

  Product.findByIdAndUpdate(productId, updateData, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({
        message: "Updated Successfully",
        product: updatedProduct,
      });
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};


