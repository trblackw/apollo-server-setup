import { MessageType } from "./types";
const Message = require('./models/message');

module.exports = {
   Query: {
      messages: () => Message.find({})
   },
   Mutation: {
      addMessage: (_: any, message: MessageType) => {
         const newMessage = new Message({ author: message.author, body: message.body });
         return newMessage.save();
      }
   }
};
