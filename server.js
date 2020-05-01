require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const connectDB = require("./config/databaseConnection");
const app = express();
const articleRoute = require("./routes/articleRoute");
connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const Article = require("./models/articleModel");

//get all the articles

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
