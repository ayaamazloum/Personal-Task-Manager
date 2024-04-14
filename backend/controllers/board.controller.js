const User = require("../models/user.model");

const createBoard = async (req, res) => {
    const user = req.user;
    try {
        console.log(req.body);
        user.boards?.push({ title: req.body.title });
        const updatedUser = await user.save();
        return res.status(201).send("Board added successfully");
    } catch (error) {
        console.error('Create board error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createBoard,
}