const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const user = User.findOne({ username });
        if (user) return res.status(409).send("Username already exists!");

        const createdUser = await User.create(req.body);
        return res.status(201).json({ user: createdUser });
      } catch (error) {
        console.log(error);
        return res.send(500).send("Internal server error!");
      }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select("-password");

        if (!user) return res.status(400).send("Incorrect credentials!");

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).send("Incorrect credentials!");

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ user, token });
      } catch (error) {
        console.log(error);
        return res.send(500).send("Internal server error!");
      }
};

module.exports = {
    register,
    login
};