//
const express = require("express");
const parser = require("body-parser");
const mustacheExpress = require("mustache-express");
const models = require("./models");
const app = express();
const port = 3000;
var id = 0;

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(parser.urlencoded({ extended: false }));
app.use(express.static("views"));
app.get("/", function(req, res) {
  models.todo
    .findAll()
    .then(function(foundTodos) {
      res.render("index", { todos: foundTodos });
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.post("/", function(req, res) {
  var todoData = req.body;
  var newTodo = models.todo.build(todoData);
  newTodo
    .save()
    .then(function(savedTodo) {
      res.redirect("/");
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});
app.post("/mark", function(req, res) {
  var matchID = req.body.id;
  models.todo
    .update(
      { complete: "true" },
      {
        where: { id: matchID }
      }
    )
    .then(function() {});
  res.redirect("/");
});
app.post("/edit", function(req, res) {
  var matchID = req.body.id;
  models.todo
    .findById(matchID)
    .then(function(foundTodo) {
      res.render("edit", { edits: foundTodo });
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});
app.post("/update", function(req, res) {
  var matchID = req.body.id;
  models.todo
    .update(
      { todo: req.body.todo },
      {
        where: { id: matchID }
      }
    )
    .then(function() {});
  res.redirect("/");
});
app.post("/delete", function(req, res) {
  var matchID = req.body.id;
  models.todo
    .destroy({
      where: { id: matchID }
    })
    .then(function() {
      res.redirect("/");
    });
});

app.listen(port, function() {
  console.log("Starting app on PORT: " + port + "...");
});
