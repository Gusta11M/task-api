const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Export the app wihout listening to a port
module.exports = app;

