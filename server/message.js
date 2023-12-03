const express = require('express');
const router = express.Router();
const { addMessage, getConversation } = require('../models/messages');

router.post('/sendMessage', async (req, res) => {
    const { senderId, receiverId, text } = req.body;
    try {
        const newMessage = await addMessage(senderId, receiverId, text);
        res.status(200).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
});

router.get('/getConversation/:userId1/:userId2', async (req, res) => {
    const { userId1, userId2 } = req.params;
    try {
        const conversation = await getConversation(userId1, userId2);
        res.status(200).json({ message: 'Conversation retrieved successfully', data: conversation });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving conversation', error: error.message });
    }
});

module.exports = router;
