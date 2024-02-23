const Product = require('../models/product')
const Category = require("../models/category");

// Create
exports.createProduct = (req,res) => {
    const { name, packSize, MRP, image, status, category } = req.body;
    // console.log(name, packSize, MRP, image, status, categoryName);
    Category.findOne({ name: category })
      .then((category) => {
        // console.log(category);
        if (!category) {
          return res.status(400).send("Category not found");
        }
        const newProduct = new Product({
          name: name,
          packSize: packSize,
          MRP: MRP,
          image: image,
          status: status ? status : false,
          category: category.name,
        });
        return newProduct.save();
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
}

// Get All Products
exports.getProducts = (req,res) => {
    Product.find()
    .then(product => {
        res.json(product);
    })
    .catch(error => {
      res.status(500).json('Not found');
    });
}

// Get Single Product
exports.getSingleProduct = (req,res) => {
    const productId = req.params.id;
    console.log(productId);
    Product.findById(productId)
    .then(product => {
        if (!product) {
        return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    })
    .catch(error => {
        res.status(500).json({ message: 'Internal Server Error' });
    });
}

// Product Delete
exports.deleteProduct = (req,res) => {
    const productId = req.params.id;
    Product.findByIdAndDelete(productId)
    .then(product => {
        if (!product) {
        return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: "deleted Successfully", product });
    })
    .catch(error => {
        res.status(500).json({ message: 'Internal Server Error' });
    });
}

// Update Product
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const updateData = req.body;
  if (updateData.category) {
    Category.findOne({ name: updateData.category })
      .then((category) => {
        if (category == null) {
          return res.status(400).send("Category not found");
        }
        // Update the category ID in the updateData
        updateData.category = category.name;
        return updateProduct(productId, updateData, res);
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  } else {
    updateProduct(productId, updateData, res);
  }
};

// Function to update the product after ensuring category existence
function updateProduct(productId, updateData, res) {
  Product.findByIdAndUpdate(productId, updateData, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Updated Successfully", product });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};
