const router = require("express").Router();
const Product = require("../controller/productsController");

// Create
router.post('/create',Product.createProduct);

// Get All Products
router.get('/find',Product.getProducts);

// Get Single Product
router.get('/find/:id',Product.getSingleProduct);

// Update Product
router.put('/update/:id',Product.updateProduct)

// Product Delete
router.delete('/delete/:id',Product.deleteProduct);

module.exports = router
