const express = require("express");
const { } = require("../controllers/board.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/:id", authMiddleware, getBoardContent);