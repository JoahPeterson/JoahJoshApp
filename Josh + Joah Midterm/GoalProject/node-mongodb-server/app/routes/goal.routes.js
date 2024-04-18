module.exports = app => {
  const goals = require("../controllers/goal.controller.js");

  var router = require("express").Router();

  // Create a new goal
  router.post("/", goals.create);

  // Retrieve all goalss
  router.get("/", goals.findAll);

  // Retrieve all published goals
  router.get("/published", goals.findAllPublished);

  // Retrieve a single goal with id
  router.get("/:id", goals.findOne);

  // Update a Goal with id
  router.put("/:id", goals.update);

  // Delete a Goal with id
  router.delete("/:id", goals.delete);

  // Create a new Goal
  router.delete("/", goals.deleteAll);

  app.use("/api/goals", router);
};
