const router = require("express").Router();
const User = require("../controller/controller");

// Register
router.post("/register", User.register);

// login
router.post("/login", User.login);

module.exports = router;
