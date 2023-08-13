// app.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRouter = require('./routes/task');
require('dotenv').config();

mongoose.connect(process.env.CONN_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const app = express();
app.use(cors());
app.use(express.json());
app.use('/tasks', taskRouter);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
