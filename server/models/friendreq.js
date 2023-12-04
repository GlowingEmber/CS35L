const mongoose = require('mongoose')

const friendReqSchema = new mongoose.Schema({
    friender: String,
    recipient: String,
    accepted: Boolean, // TRUE for accepted; FALSE for pending/outgoing. Deleted upon rejection by recipient
})

const friendReqModel = mongoose.model("friendReqs", friendReqSchema) // logins is name of table in DB
module.exports = friendReqModel

