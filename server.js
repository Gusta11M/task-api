const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Middlewares, rotas, etc.
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
      app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
      });
    })
    .catch(err => console.error(err));
}

module.exports = app;