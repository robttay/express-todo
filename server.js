const express = require("express");
const parser = require("body-parser");
const mustacheExpress = require("mustache-express");
const app = express();
const port = 3000;
const todos = ["Wash the car", "Cut the grass"];

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(parser.urlencoded({ extended: false }));
app.get("/", function(req, res) {
  res.render("index", { todos: todos });
});

app.post("/", function(req, res) {
  todos.push(req.body.todo);
  res.redirect("/");
});

app.listen(port, function() {
  console.log("Starting app on PORT: " + port + "...");
});
