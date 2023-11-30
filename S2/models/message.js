//record data in mongoDb
const mongoose = require('mongoose');

/*An example from MongoDB.com on how to store current date and client's offset
var now = new Date();
db.data.save( { date: now,
                offset: now.getTimezoneOffset() } );

var record = db.data.findOne();
var localNow = new Date( record.date.getTime() -  ( record.offset * 60000 ) );
*/

//open a connection to the database 
const messageSchema = new mongoose.Schema({
   username : {type: String, required: true },
   message_content : {type: String, required: true},
   timestamp :{type: Date , Default: Date.now},
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message; 

