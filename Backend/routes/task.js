// routes/task.js

const router = require('express').Router();
const Task = require('../task.model');
const Column = require("../task.model");

router.route('/').get(async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(400).json('Error: ' + error);
    }
  });
  
  router.route('/add').post(async (req, res) => {
    const { title, description, date, isImportant, isCompleted, category, subtasks } = req.body;
    const newTask = new Task({ title, description, date, isImportant, isCompleted, category, subtasks, });
  
    try {
      await newTask.save();
      res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
      res.status(400).json('Error: ' + error);
    }
  });

  
module.exports = router;
