const mongoose = require('mongoose')

const friendReqSchema = new mongoose.Schema({
    friender: String,
    recipient: String,
    timestamp: String,
    accepted: Boolean, // TRUE for accepted; FALSE for pending/outgoing. Deleted upon rejection by recipient
})

const FriendReqModel = mongoose.model("friendreqs", friendReqSchema) // logins is name of table in DB
module.exports = FriendReqModel
