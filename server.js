require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { rootHandler } = require("./handlers/root");
const {
  createAnimalHandler,
  getAnimalsHandler,
  updateAnimalHandler,
  deleteAnimalHandler,
} = require("./handlers/animals");

mongoose.connect(process.env.MONGODB_CONNECTION);

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get("/", rootHandler);
app.get("/animals", getAnimalsHandler);
app.post("/animals", createAnimalHandler);
app.patch("/animals/:id", updateAnimalHandler);
app.delete("/animals/:id", deleteAnimalHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
