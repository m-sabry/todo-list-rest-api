module.exports = app => {
    const todos = require("../controllers/todo.controller");
  
    // Create a new Todo
    app.post("/todos", todos.create);
  
    // Retrieve all Todos
    app.get("/todos", todos.findAll);
  
    // Retrieve a single Todo with todoId
    app.get("/todos/:id", todos.findOne);
  
    // Update a Todo with todoId
    app.put("/todos/:id", todos.update);
  
    // Delete a Todo with todoId
    app.delete("/todos/:id", todos.delete);
  
    // Create a new Todo
    app.delete("/todos", todos.deleteAll);
  };