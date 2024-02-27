const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: String, default: Date.now() },
});
User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
User.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
User.methods.generateJWT = function () {
  const now = new Date();
  const expiration = new Date(now);
  expiration.setHours(now.getHours() + 3);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: Math.floor(expiration.getTime() / 1000),
    },
    config.secret
  );
};
User.methods.generateJWTforemail = function () {
  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      expiresIn: "1m",
    },
    config.secret
  );
};

module.exports = mongoose.model("User", User);
