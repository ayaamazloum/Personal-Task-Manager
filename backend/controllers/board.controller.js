const User = require("../models/user.model");

const createBoard = async (req, res) => {
    const user = req.user;
    try {
        user.boards?.push({ title: req.body.title });
        const updatedUser = await user.save();
        return res.status(201).send("Board added successfully");
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
        console.error('Create board error:', error);
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
        return res.status(201).send("Tag added successfully");
    } catch (error) {
        console.error('Create board error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateTask = async (req, res) => {

};

module.exports = {
    createBoard,
    createTag,
    createTask,
    updateTask,
}