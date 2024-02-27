const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rohitschavan0102@gmail.com",
    pass: "wgmeejqpqvmcwzax",
  },
});
