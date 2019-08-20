const { Schema, model }  = require('mongoose');

const messageSchema = new Schema({
   body: { type: String, required: true },
   author: { type: String, required: true },
   created_at: { type: Date, default: Date.now }
})

//@ts-ignore
const Message = model('message', messageSchema);

module.exports = Message;