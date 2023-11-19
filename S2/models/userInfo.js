const mongoose = require('mongoose')

const UserInfoSchema = new mongoose.Schema({
    name: String,
    color: String,
    count: Number,
    bio: String
})

const UserInfoModel = mongoose.model("userInfo", UserInfoSchema) // logins is name of table in DB
module.exports = UserInfoModel