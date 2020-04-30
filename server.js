require("dotenv").config();

const express = require("express");
const connectDB = require("./config/databaseConnection");
const app = express();
const articleRoute = require("./routes/articleRoute");

connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/articles", articleRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
