const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json()); // to accept JSON data
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes); // Add chat routes
app.use("/api/message", messageRoutes); // Add message routes

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle chat events here
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
