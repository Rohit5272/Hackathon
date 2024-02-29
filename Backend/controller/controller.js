const User = require("../models/user");
const nodemailer = require("nodemailer");

// Register User
exports.register = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });
  newUser.password = newUser.generateHash(req.body.password);
  newUser.save().then((data) => res.status(201).json(data))
  .catch(err => res.send(err))
};

// LoginUser
exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).then((loginUser) => {
    if (!loginUser) {
      return res.status(401).json({ message: "Invalid username & password" });
    }
    if (!loginUser.validatePassword(req.body.password)) {
      return res.status(401).json({ message: "Invalid Username & password" });
    }
    const withToken = { email: loginUser.email, _id: loginUser._id };
    withToken.token = loginUser.generateJWT();
    res.status(200).json(withToken);
  });
};

// Send Email
exports.sendemail = async (req,res) => {
  console.log('Send Email');
  const email = req.body.email
  if(email) {
    const user = await User.findOne({email:email})
    const withToken = { email: user.email, id: user._id };
    withToken.token = user.generateJWTforemail();
    const link = `http://localhost:4200/reset/${withToken.token}`;
    // Send Email
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: "rohitschavan0102@gmail.com",
        pass: "wgmeejqpqvmcwzax",
      },
    });
    await transporter.sendMail({
      from: "rohitschavan0102@gmail.com", 
      to: user.email, 
      subject: "Change Password",
      html: `<a href=${link}>Click Here</a> to Reset Your news Password`,
    });
    res.json({ message: "link send successfully" ,data:link});
  } else {
    res.send("email is required")
  }
}

exports.resetPassword = async (req,res) => {
  const {password, confirm_password} = req.body
  const id = req.userData.id;
  const user = await User.findById(id)
  try {
    if(password === confirm_password) {
      user.password = user.generateHash(password);
      res.send(user)
      await User.findByIdAndUpdate(user._id,{$set:{password: user.password }})
    } else {
      res.send("password not match")
    }
  } catch (error) {
    res.send(error);
  }
}


