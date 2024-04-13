const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "First name is required"
    },
    lastName: {
        type: String,
        required: "Last name is required"
    },
    username: {
        type: String,
        required: "Username is required",
        unique: true,
    },
    password: {
        type: String,
        required: "Password is required",
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassowrd = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

const User = mongoose.modelmodel("User", userSchema);

module.exports = User;