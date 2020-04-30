const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");

router.get("", (req, res) => {
  articles = [
    {
      title: "first title",
      createdAt: new Date(),
      description: "first description",
    },
    {
      title: "2 title",
      createdAt: new Date(),
      description: "2 description",
    },
  ];

  res.render("articles/index", { articles: articles });
});
router.get("/:id", (req, res) => {
  res.render("articles/new");
});
router.get("/new", (req, res) => {
  res.render("articles/new");
});

router.post("/", (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    articles.save();
    res.redirect(`articles/${article.id}`);
  } catch (err) {
    console.log(err);
    res.render("articles/new", { article: article });
  }
});

module.exports = router;
