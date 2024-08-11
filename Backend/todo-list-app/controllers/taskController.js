const Task = require('../models/taskModel');

// GET all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' });
    }
};

// POST a new task
const createTask = async (req, res) => {
    const { description, user, status, dueDate, priority } = req.body;

    try {
        const newTask = new Task({
            description,
            user,
            status,
            dueDate,
            priority
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT update a task by ID
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { description, user, status, dueDate, priority } = req.body;

    try {
        const task = await Task.findOne({ id: Number(id) });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Update task properties
        task.description = description || task.description;
        task.user = user || task.user;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;

        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE a task by ID
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Task.deleteOne({ id: Number(id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task removed' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
