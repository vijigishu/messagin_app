const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

http.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
});

app.use(express.static(__dirname + '/public')); // Serve static files from 'public'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Serve index.html from root
});

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('Connected...');

    // Handle incoming chat messages
    socket.on('chatMessage', (msg) => {
        console.log('Message received:', msg);

        // Broadcast the message to all clients except the sender
        socket.broadcast.emit('chatMessage', msg);
    });

    // Optional: Handle disconnections
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
