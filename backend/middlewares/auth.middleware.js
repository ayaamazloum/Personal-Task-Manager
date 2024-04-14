const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded._id).select("-password");
        
        if (!user) throw new Error("User not found");

        req.user = user;
        return next();
     } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthenticated");
    }
};

module.exports = isAuthenticated;
