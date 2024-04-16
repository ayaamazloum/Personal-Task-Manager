const User = require("../models/user.model");

const createBoard = async (req, res) => {
    const user = req.user;
    try {
        user.boards?.push({ title: req.body.title });
        const updatedUser = await user.save();

        const newBoard = updatedUser.boards[updatedUser.boards.length - 1];

        return res.status(201).json({ message: "Board added successfully", board: newBoard });
    } catch (error) {
        console.error('Create board error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createTag = async (req, res) => {
    const user = req.user;
    const { boardId, name } = req.body;
    try {
        const board = await user.boards.find(board => board._id == boardId );
        if (!board) return res.status(404).send("Board not found");

        const tagIndex = board.tags.findIndex((tag) => tag.name === name);
        if (tagIndex !== -1) return res.status(409).send("Tag already exists!");
        
        tags.push({ name });
        const updatedUser = await user.save();
        return res.status(201).send("Tag added successfully");
    } catch (error) {
        console.error('Create tag error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createTask = async (req, res) => {
    const user = req.user;
    const { boardId, tagId, title, description } = req.body;
    try {
        const board = await user.boards.find(board => board._id == boardId );
        if (!board) return res.status(404).send("Board not found");

        const tag = board.tags.find(tag => tag._id == tagId );
        if (!tag) return res.status(404).send("Tag not found");

        tag.tasks.push({ title: title, description: description });
        const updatedUser = await user.save();

        const updatedBoard = await updatedUser.boards.find(board => board._id == boardId);
        const updatedTag = await updatedBoard.tags.find(tag => tag._id == tagId);
        const newTask = await updatedTag.tasks[updatedTag.tasks.length - 1];

        return res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        console.error('Create task error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateTask = async (req, res) => {
    const user = req.user;
    const { boardId, tagId, title, description, column } = req.body;
    const { id } = req.params;
    try {
        const board = await user.boards.find(board => board._id == boardId );
        if (!board) return res.status(404).send("Board not found");

        if (column) {
            if(!board.columns.includes(column))
             return res.status(404).send("Column not found");
        }

        const tag = board.tags.find(tag => tag._id == tagId );
        if (!tag) return res.status(404).send("Tag not found");
        
        const tasks = tag.tasks;
        const taskIndex = tasks.findIndex((task) => task._id == id);
        
        if (taskIndex === -1) return res.status(404).send("Task not found");
        const updatedTask = {
            _id: tasks[taskIndex]._id,
            title: title ? title : tasks[taskIndex].title,
            description: description ? description : tasks[taskIndex].description,
            attachments: tasks[taskIndex].attachments,
            column: column ? column : tasks[taskIndex].column,
        };
        tasks[taskIndex] = updatedTask;

        const updatedUser = await user.save();
        return res.status(200).send("Task updated successfully");
    } catch (error) {
        console.error('Update task error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createBoard,
    createTag,
    createTask,
    updateTask,
}