const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const taskController = require('../controllers/taskController');
const { validateTaskCreation, validateTaskUpdate, handleValidationErrors } = require('../middleware/validators');


router.post('/', authMiddleware, validateTaskCreation, handleValidationErrors, taskController.createTask);

router.get('/', authMiddleware, taskController.getUserTasks);

router.put('/:id', authMiddleware,validateTaskUpdate,handleValidationErrors, taskController.updateTask);

router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
