const { request } = require("express");
const Todo = require("../models/todo.model");

// Create and Save a new Todo
exports.create = (req, res) => {
  // check if request body is empty
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  
  // Initiating todo
  const todo = new Todo({
    name: req.body.name,
    description: req.body.description
  });
  
  // Save Todo in the database
  Todo.create(todo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    else res.send(data);
  });
};

// Retrieve all Todos from the database.
exports.findAll = (req, res) => {
    Todo.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Todos."
          });
        else res.send(data);
      });
};

// Find a single Todo with a id
exports.findOne = (req, res) => {
    Todo.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Todo with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Todo with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Todo identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Todo.updateById(
    req.params.id,
    new Todo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Todo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Todo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
    Todo.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Todo with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Todo with id " + req.params.id
            });
          }
        } else res.send({ message: `Todo was deleted successfully!` });
      });
};

// Delete all Todos from the database.
exports.deleteAll = (req, res) => {
  
};
