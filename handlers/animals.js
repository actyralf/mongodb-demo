const mongoose = require("mongoose");
const Animal = require("../models/Animal");

const getAnimalsHandler = async (req, res) => {
  try {
    const animals = await Animal.find({
      age: { $lte: 60, $gte: 20 },
    });
    res.json(animals);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

const createAnimalHandler = async (req, res) => {
  try {
    const { name, breed, age } = req.body;
    console.log(req.body.name);
    const kitty = new Animal({ name, breed, age });
    await kitty.save();
    res.json({ message: `An animal named ${req.body.name} has been created` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

const updateAnimalHandler = async (req, res) => {
  try {
    console.log(req.params.id);

    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

const deleteAnimalHandler = async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    if (!deletedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.json({ message: "ok", deletedAnimal });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  createAnimalHandler,
  getAnimalsHandler,
  updateAnimalHandler,
  deleteAnimalHandler,
};
