//
const express = require("express");
const parser = require("body-parser");
const mustacheExpress = require("mustache-express");
const app = express();
const port = 3000;
const todos = [];
const complete = [];
var id = 0;

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(parser.urlencoded({ extended: false }));
app.use(express.static("views"));
app.get("/", function(req, res) {
  res.render("index", { todos: todos, complete: complete });
});

app.post("/", function(req, res) {
  req.body.id = id;
  id++;
  todos.push({ todoitem: req.body.todo, id: req.body.id });
  res.redirect("/");
});

app.post("/mark", function(req, res) {
  console.log("at for each");
  todos.forEach((item, index) => {
    if (item.id == req.body.id) {
      complete.push(item.todoitem);
      todos.splice(index, 1);
    }
  });
  res.redirect("/");
});

app.listen(port, function() {
  console.log("Starting app on PORT: " + port + "...");
});
/////
//// WORK ON LOGIC TO MOVE COMPLETED TODOS TO BOTTOM OF PAGE -
//// CHECK BUTTON LOGIC - HOW TO CAPTURE VALUE TO MOVE TO COMPLETE
//// ARRAY???? MAYBE SLICE FROM TODOS BY INDEX NUMBER???
////
/////   BUILT COUNT VARIABLE AND ADDED TO APP.USE
