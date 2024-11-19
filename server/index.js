const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const db = require("./models");

const toDoRouter = require("./routes/ToDos");

app.use("/ToDos", toDoRouter);

db.sequelize.sync().then(() => {
  app.listen(5000, () => [console.log(`Server running on port 5000`)]);
});
