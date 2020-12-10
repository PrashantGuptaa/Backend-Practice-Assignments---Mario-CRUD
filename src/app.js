const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");
const mongoose = require("mongoose");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here

const marioCharSchema = new mongoose.Schema({
  name: String,
  weight: Number,
});

const Mario = mongoose.model("mario", marioCharSchema);

app.get("/", (req, res) => {
  res.send({ res: "Prashant" });
});

app.get("/mario", (req, res) => {
  Mario.find().then((mario) => {
    mario.map((eachMario) => temp.push(eachMario.name));
  });
  res.send(temp);
});

app.get("/mario/:id", (req, res) => {
  const id = req.params.id;
  Mario.findById({ id }).then((char) => {
    if (!char) {
      res.status(400).send({ message: "error.message" });
    } else {
      res.send(char);
    }
  });
});

app.post("/mario", (req, res) => {
  let { name, weight } = req.body;
  if (!name || !weight) {
    res.status(400).send({ message: "either name or weight is missing" });
    return;
  }
  const mario = new Mario({
    name,
    weight,
  });

  mario.save().then((mario) => res.status(201).send(mario));
});

module.exports = app;
