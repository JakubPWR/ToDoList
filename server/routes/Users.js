const express = require("express");
const { ToDos } = require("../models");
const { FinishedToDos } = require("../models");
const { Users } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS YOU REGISTERED");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "User not found" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "Wrong password or username" });
      if (match) {
        const accesToken = sign(
          { username: user.username, id: user.id },
          "importantsecret"
        );
        res.json(accesToken);
      }
    });
  }
});

router.get("/user", async (req, res) => {
  const jwt = req.header("jwt");
  const decoded = verify(jwt, "importantsecret");
  const usersId = decoded.id;
  res.json(usersId);
});
module.exports = router;
