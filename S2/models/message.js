
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//connect
const mongoDB = mongodb+srv://max09lui:T4XEs0OHoUJIcJGF@cluster0.kcdmgrl.mongodb.net/?retryWrites=true&w=majority;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    content: String,
    sender: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

io.on('connection', (socket) => {
    console.log('A user connected');

    Message.find().sort({ timestamp: 1 }).exec((err, messages) => {
        if (err) {
            console.error(err);
            return;
        }
        socket.emit('initialMessages', messages);
    });

    socket.on('newMessage', (data) => {
        const newMessage = new Message(data);

        // Save the message in MongoDB
        newMessage.save((err) => {
            if (err) {
                console.error(err);
                return;
            }

            // Broadcast the message to all connected users
            io.emit('messageReceived', data);
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
