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
    const { name } = req.body;
    try {
        const board = await user.boards.find(board => board._id == req.body.boardId );
        
        if (!board) return res.status(404).send("Board not found");

        const tags = board.tags;
        const tagIndex = tags.findIndex((tag) => tag.name === name);

        if (tagIndex !== -1) return res.status(409).send("Tag already exists!");
        
        tags.push({ name });
        const updatedUser = await user.save();
        return res.status(201).send("Tag added successfully");
    } catch (error) {
        console.error('Create board error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createBoard,
    createTag,
}