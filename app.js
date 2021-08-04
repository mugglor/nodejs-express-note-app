const express = require("express");
const connectDB = require("./config/db");
const exphandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
//import route
const posts = require("./routes/posts");

//khoi dong app
const app = express();

//khoi dong handlebars middleware
app.engine("handlebars", exphandlebars());
app.set("view engine", "handlebars");

//khoi dong bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//khoi dong methodOverride middleware
app.use(methodOverride("_method"));

//khoi dong express middleware
app.use(express.json());

//ket noi database
connectDB();

//1 so routes co ban
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));

//su dung routes
app.use("/posts", posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
