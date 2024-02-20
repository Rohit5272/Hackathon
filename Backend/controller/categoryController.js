const Category = require("../models/category");

// Create
exports.createCategory = (req, res) => {
  console.log("Create");
  const { name, description, status } = req.body;
  const userId = req.userData.id;
  const category = new Category({
    name: name,
    description: description,
    status: status,
    user: userId,
  });
  category
    .save()
    .then((result) => {
      res.send("Post Created Successfully" + result);
    })
    .catch((err) => {
      res.send("not created" + err);
    });
};

// Retrieve all posts of the logged-in user
exports.getCategory = (req, res) => {
  const userId = req.userData.id;

  Category.find({ user: userId })
    .then((data) => res.json({ message: "Posts retrieved successfully", data }))
    .catch((err) =>
      res.status(400).json({ message: "Failed to retrieve posts", error: err })
    );
};

// Get Single Data
exports.GetSingleCategory = (req, res) => {
  console.log("Get Single");
  const categoryId = req.params.id;
  const userId = req.userData.id;
  Category.findOne({ _id: categoryId, user: userId })
    .then((data) => {
      if (data) {
        res.json({ message: "Post retrieved successfully", data: data });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((err) =>
      res.status(400).json({ message: "Failed to retrieve post", error: err })
    );
};

// Update by Id
exports.UpdateCategory = (req, res) => {
  const categoryId = req.params.id;
  const userId = req.userData.id;
  Category.findOneAndUpdate({ _id: categoryId, user: userId }, req.body, {
    new: true,
  })
    .then((data) => {
      if (data) {
        res.json({ message: "Post updated successfully", data: data });
      } else {
        res.status(404).json({ message: "Post not found or unauthorized" });
      }
    })
    .catch((err) =>
      res.status(400).json({ message: "Failed to update post", error: err })
    );
};

// Delete
exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id;
  const userId = req.userData.id;

  Category.findOneAndDelete({ _id: categoryId, user: userId })
    .then((data) => {
      if (data) {
        res.json({ message: "Post deleted successfully", data: data });
      } else {
        res.status(404).json({ message: "Post not found or unauthorized" });
      }
    })
    .catch((err) =>
      res.status(400).json({ message: "Failed to delete post", error: err })
    );
};
