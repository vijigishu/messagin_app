const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

// Controller to send a message
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    // Populate sender and chat fields
    message = await Message.findById(message._id)
      .populate("sender", "username pic")
      .populate("chat")
      .exec();

    message = await User.populate(message, {
      path: "chat.users",
      select: "username pic email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
// Controller method to fetch messages
const getMessages = async (req, res) => {
    try {
      const { chatId } = req.params; // Assuming you pass chatId as a parameter
      const messages = await Message.find({ chat: chatId }).populate('sender', 'name'); // Adjust as needed
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  module.exports = {
    sendMessage,
    getMessages,
  };