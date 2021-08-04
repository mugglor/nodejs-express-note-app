const express = require("express");
const router = express.Router();

//Load model
const Post = require("../models/Post");

//Hien thi tat ca cac post
router.get("/", async (req, res) => {
  const posts = await Post.find().lean().sort({ date: -1 });
  res.render("posts/index", { posts });
});

//Hien thi form create new post
router.get("/add", (req, res) => {
  res.render("posts/add");
});

// Tạo post mới để lưu vào database
router.post("/", async (req, res) => {
  const { title, text } = req.body;

  let error = [];

  if (!title) error.push({ msg: "Title required" });
  if (!text) error.push({ msg: "Text required" });
  if (error.length > 0) res.render("posts/add", { title, text });
  else {
    const newPostData = { title, text };
    const newPost = new Post(newPostData);
    await newPost.save();
    res.redirect("/posts");
  }
});

//Hien thi edit form
router.get("/edit/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).lean();
  res.render("posts/edit", { post });
});

//Update post trong database
router.put("/:id", async (req, res) => {
  const { title, text } = req.body;
  await Post.findOneAndUpdate({ _id: req.params.id }, { title, text });
  res.redirect("/posts");
});

//Delete post
router.delete("/:id", async (req, res) => {
  await Post.findOneAndDelete({ _id: req.params.id });
  res.redirect("/posts");
});

module.exports = router;
