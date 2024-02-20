const authenticate = require('../authenticate');
const Category = require('../controller/categoryController')
const router = require("express").Router();

//Create Category
router.post("/create", Category.createCategory);

// Retrieve all Category
router.get("/find", Category.getCategory);

// // Get Single Category
router.get("/find/:id", Category.GetSingleCategory)

// // Update
router.put("/update/:id", Category.UpdateCategory);

// // Delete
router.delete("/delete/:id", Category.deleteCategory);

module.exports = router