const express = require("express");
const { getBoard } = require("../controllers/board.controller");
const isAuthenticated = require("../middlewares/auth.middleware");
const boardController = require("../controllers/board.controller");
const router = express.Router();

router.get("/:id", isAuthenticated, boardController.getBoard);

module.exports = router;