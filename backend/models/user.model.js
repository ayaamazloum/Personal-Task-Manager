const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: "Title is required" },
    description: { type: String, required: "Description is required" },
    attachments: [{ type: String }],
    tags: [{ type: String }]
});

const columnSchema = ({
    title: { type: String, required: "Title is required" },
    tasks: [taskSchema]
});

const boardSchema = new mongoose.Schema({
    title: { type: String, required: "Title is required" },
    columns: [columnSchema]
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: "First name is required" },
    lastName: { type: String, required: "Last name is required" },
    username: { type: String, required: "Username is required", unique: true },
    password: { type: String, required: "Password is required" },
    boards: [boardSchema]
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;