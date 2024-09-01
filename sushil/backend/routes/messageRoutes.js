const express = require("express");
const { sendMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");
const { getMessages } = require('../controllers/messageController')
const router = express.Router();

// Route to send a message
router.post("/sendMessage", protect, sendMessage);

// Route to fetch messages
router.get("/:chatId", protect, getMessages);

module.exports = router;
