const Product = require("../models/product");
const Category = require("../models/category");

// Create
exports.createProduct = async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");

    // Find category by name
    const category = await Category.findOne({ name: req.body.category });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const product = new Product({
      name: req.body.name,
      image: url + "/public/" + req.file.filename,
      packSize: req.body.packSize,
      MRP: req.body.MRP,
      status: req.body.status,
      category: category._id, // Assign category ID
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product created successfully!",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  const userId = req.userData.id;
  Category.find({ user: userId }) // Find categories owned by the logged-in user
    .then((categories) => {
      const categoryIds = categories.map((category) => category._id); // Extract category IDs

      return Product.find({ category: { $in: categoryIds } }).populate(
        "category",
        "name"
      );
    })
    .then((products) => {
      res.json(products); // Send the products associated with the user's categories
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to retrieve products", error: err });
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

exports.updateProduct = async (req, res) => {
  console.log('update');
  const productId = req.params.id;
  let updateData = req.body;

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    updateData.image = url + "/public/" + req.file.filename;
  }

  if (updateData.category) {
    try {
      const category = await Category.findOne({ name: updateData.category });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      updateData.category = category._id;
    } catch (error) {
      console.error('Error finding category:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
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


