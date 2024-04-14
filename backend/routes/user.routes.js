const express = require("express");
const isAuthenticated = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get("/", isAuthenticated, userController.getAllData);

module.exports = router;