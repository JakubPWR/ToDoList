const express = require("express");
const { ToDoLists } = require("../models");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const { where } = require("sequelize");

router.post("/create", async (req, res) => {
  try {
    const { jwt, toDoListName } = req.body;

    if (!jwt) {
      return res.status(401).json({ error: "Unauthorized: JWT is required." });
    }

    // Verify the JWT and extract the user's ID
    const decoded = verify(jwt, "importantsecret");
    const usersId = decoded.id;
    if (!usersId) {
      return res.status(401).json({ error: "Unauthorized: no ID" });
    }

    // Create the new to-do list
    await ToDoLists.create({ name: toDoListName, owner: usersId });

    res.json("SUCCESS");
  } catch (error) {
    console.error("Error creating to-do list:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid JWT token." });
    }
    res
      .status(500)
      .json({ error: "An error occurred while creating the list." });
  }
});

router.get("/", async (req, res) => {
  const usersId = req.header("usersId");
  const lists = await ToDoLists.findAll({
    where: { owner: usersId },
  });
  res.json(lists);
});
router.get("/byId", async (req, res) => {
  const id = req.header("listId");
  const list = await ToDoLists.findByPk(id);
  res.json(list);
});

module.exports = router;
