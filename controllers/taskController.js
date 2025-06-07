const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description } = req.body;

    try{
        //Crate new task
        const task = new Task({
            title,
            description,
            user: req.user.id // Assuming req.user is set by an authentication middleware
        });

        // Save task to database
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getUserTasks = async (req, res) => {
    try{
        // Find tasks for the authenticated user
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 })

        //Check if tasks exist
        if(tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this user' });
        }
        //Return tasks
        res.status(200).json({ tasks });
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.updateTask = async (req, res) => {

    const id = req.params.id;
    const { title, description, completed } = req.body;

    try {
        // Find the task by ID
        const task = await Task.findById(id);

        // Check if task exists
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        //Check if the user is authorized to update the task
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        // Update task fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;

        // Save the updated task
        await task.save();

        res.status(200).json({ message: 'Task updated successfully', task });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.deleteTask = async (req, res) => {

    const id = req.params.id;

    try {
        // Find the task by ID
        const task = await Task.findById(id);

        // Check if task exists
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        // Check if the user is authorized to delete the task
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        // Delete the task
        await task.deleteOne();

        // Return success response
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}