const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String },
    isImportant: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    category: { type: String },
    subtasks: [{
        title: { type: String, default: 'Default Subtask' } // Set a default subtask title
      }],    
  });
  

const Task = mongoose.model('Task', taskSchema);


module.exports = Task;
