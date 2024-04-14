const User = require("../models/user.model");

const getAllData = async (req, res) => {
    try {
        return res.status(201).json({ user: req.user });
    } catch (error) {
        console.error('Get all user data error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllData,
}