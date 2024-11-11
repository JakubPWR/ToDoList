const express = require("express");
const { ToDos } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  const listOfToDos = await ToDos.findAll();
  res.json(listOfToDos);
});

router.post("/", async (req, res) => {
  const toDo = req.body;
  await ToDos.create(toDo);
  res.json(post);
});
module.exports = router;
