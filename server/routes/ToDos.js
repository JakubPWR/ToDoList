const express = require("express");
const { ToDos } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { FinishedToDos } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  const listOfToDos = await ToDos.findAll();
  res.json(listOfToDos);
});

router.post("/", validateToken, async (req, res) => {
  const toDo = req.body;
  console.log(req.body);
  await ToDos.create(toDo);
  res.json(toDo);
});
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const toDo = await ToDos.findByPk(id);
  res.json(toDo);
});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await ToDos.destroy({ where: { id: id } });
  const newToDos = await ToDos.findAll();
  res.json(newToDos);
});
router.patch("/finish/:id", async (req, res) => {
  const toDo = req.body;
  await FinishedToDos.create(toDo);
  await ToDos.destroy({ where: { id: toDo.id } });
});
router.get("/finished", async (req, res) => {
  const id = req.header("id");
  console.log(`tuuuuuuuu uuuuu ${id}`);
  const listOfFinishedToDos = await FinishedToDos.findAll({
    where: { listId: id },
  });
  res.json(listOfFinishedToDos);
});
router.patch("/edit/:id", async (req, res) => {
  const toDo = req.body;
  const toDoToEdit = await ToDos.findByPk(toDo.id);
  await toDoToEdit.update(toDo);
});
router.get("/byListId", async (req, res) => {
  const id = req.header("id");
  const toDos = await ToDos.findAll({ where: { listId: id } });
  console.log(`tuuuuu tajjjjj ${toDos}`);
  res.json(toDos);
});
module.exports = router;
