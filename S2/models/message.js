const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const conversationSchema = new mongoose.Schema({
    participants: {
        type: [String],
        required: true
    },
    messages: [messageSchema]
});

const conversationModel = mongoose.model("Conversations", conversationSchema);

//Addmessages
async function addMessage(senderId, receiverId, text) {
    const conversation = await conversationModel.findOneAndUpdate(
        { participants: { $all: [senderId, receiverId] } },
        { $push: { messages: { sender: senderId, receiver: receiverId, text: text } } },
        { new: true, upsert: true }
    );
    return conversation;
}

async function getConversation(userId1, userId2) {
    const conversation = await conversationModel.findOne({ participants: { $all: [userId1, userId2] } });
    return conversation ? conversation.messages : [];
}

module.exports = MessageModel;
