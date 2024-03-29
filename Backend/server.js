const express = require("express");
const app = express();
const config = require("./config/config");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authenticate = require("./authenticate");
const cors = require("cors");

app.use(cors());
app.options("*", cors());

// Database connection
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(config.DBURL)
  .then(() => console.log("connected to the Database"))
  .catch((err) => console.log(err));
// Make "public" Folder Publicly Available
app.use("/public", express.static("public"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/category", authenticate, categoryRoutes);
app.use("/product", productRoutes);

// Simple Route
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Server is running port 3000"));
