const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true, 
        required: false 
    },
    description: {
        type: String,
        required: false 
    },
    user: {
        type: String,
        required: false 
    },
    status: {
        type: String,
        enum: ['complete', 'in progress'],
        required: false 
    },
    dueDate: {
        type: Date,
        required: false 
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: false 
    }
});


taskSchema.pre('save', async function(next) {
    if (!this.id) {
        const lastTask = await this.model('Task').findOne().sort({ id: -1 });
        this.id = lastTask ? lastTask.id + 1 : 1; 
    }
    next();
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
