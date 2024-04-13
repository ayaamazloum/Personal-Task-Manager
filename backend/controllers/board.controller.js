const User = require("../models/user.model");

const getBoardContent = async () => {
    const { id } = req.params;
    try {
        const board = await req.user.boards.findById(id);
        if (!board) {
            return res.status(404).send("Board not found");
        }

        return res.status(200).json({ board });
    } catch (error) {
        console.error('Get all tasks error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getBoardContent,
}