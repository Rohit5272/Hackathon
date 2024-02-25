const router = require("express").Router();
const multer = require("multer");
const Product = require("../controller/productsController");
const authenticate = require('../authenticate')

// Multer File upload settings
const DIR = "./public/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null,fileName);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req,file,cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") 
        {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
})

// Create
router.post("/create", upload.single("image"), Product.createProduct);

// Get All Products
router.get('/find',authenticate,Product.getProducts);

// Get Single Product
router.get('/find/:id',authenticate,Product.getSingleProduct);

// Update Product
router.put("/update/:id", upload.single("image"), Product.updateProduct);

// Product Delete
router.delete('/delete/:id',authenticate ,Product.deleteProduct);

module.exports = router;
