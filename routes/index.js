var express = require("express");
var router = express.Router();
const Post = require("./../models/post");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const posts = await Post.find().sort({ publish_date: -1 }).exec();
  res.render("index", { title: "Express", posts: posts });
});

module.exports = router;
