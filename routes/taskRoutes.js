const { validateTask, validateTaskUpdate, handleValidationErrors } = require('../middleware/validators');

router.post('/', authMiddleware,validateTask,handleValidationErrors, taskController.createTask);

router.get('/', authMiddleware, taskController.getUserTasks);

router.put('/:id', authMiddleware,validateTaskUpdate,handleValidationErrors, taskController.updateTask);

router.delete('/:id', authMiddleware, taskController.deleteTask);
