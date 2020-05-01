const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");

//direct to create new article
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

//edit form
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

//save new article
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

//view a single article

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });

  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
});

//edit
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

//delete
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
