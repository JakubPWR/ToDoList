const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const db = require("./models");

const toDoRouter = require("./routes/ToDos");

app.use("/ToDos", toDoRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => [console.log(`Server running on port 3001`)]);
});
