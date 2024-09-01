const express = require("express");
const { accessChat, fetchChats } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to access or create a chat
router.post("/accessChat", protect, accessChat);

// Route to fetch all chats for the logged-in user
router.get("/fetchChats", protect, fetchChats);

module.exports = router;
