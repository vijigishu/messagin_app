import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './style.css';

// Replace 'http://localhost:3000' with your server's IP address and port
const socket = io('http://192.168.0.100:3000'); // Connect to the Socket.IO server

const App = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const messageAreaRef = useRef(null);

    useEffect(() => {
        // Prompt user for their name
        let name = '';
        while (!name) {
            name = prompt('Please enter your name:');
        }
        name = capitalizeFirstLetter(name);
        setUserName(name);
        
        // Replace "Chat" with the user's name in the title
        document.getElementById('chatTitle').innerText = name;

        // Listen for incoming messages from the server
        socket.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
            scrollToBottom();
        });

        // Cleanup on component unmount
        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Format the message to wrap lines after 25 characters
            const formattedMessage = formatMessage(message.trim());

            const msg = {
                user: userName,
                message: formattedMessage,
            };

            socket.emit('chatMessage', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
            setMessage('');
            scrollToBottom();
        }
    };

    const formatMessage = (message) => {
        const maxCharsPerLine = 25;
        let formattedMessage = '';

        for (let i = 0; i < message.length; i += maxCharsPerLine) {
            formattedMessage += message.substring(i, i + maxCharsPerLine) + '\n';
        }

        return formattedMessage.trim();
    };

    const scrollToBottom = () => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    };

    return (
        <section className="chat__section">
            <div className="brand">
                <img height="40" style={{ borderRadius: '50%' }} src="/sp.jpg" alt="" />
                <h1 id="chatTitle">Chat</h1>
            </div>
            <div className="message__area" ref={messageAreaRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.user === userName ? 'outgoing' : 'incoming'}`}>
                        <p><strong>{msg.user}:</strong> {msg.message}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message"
                />
            </form>
        </section>
    );
};

export default App;
