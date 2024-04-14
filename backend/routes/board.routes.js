const express = require("express");
const isAuthenticated = require("../middlewares/auth.middleware");
const boardController = require("../controllers/board.controller");
const router = express.Router();

router.post("/", isAuthenticated, boardController.createBoard);

module.exports = router;