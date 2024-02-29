const router = require("express").Router();
const User = require("../controller/controller");
const authenticate = require('../authenticate')

// Register
router.post("/register", User.register);

// login
router.post("/login", User.login);

// send email
router.post('/sendemail',User.sendemail)

// reset Password
router.post("/reset", authenticate, User.resetPassword);

module.exports = router;
