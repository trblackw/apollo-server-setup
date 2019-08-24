import { MessageType } from './types';
const Message = require('./models/message');
const { PubSub } = require('apollo-server')

const pubsub = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';
module.exports = {
   Query: {
      messages: () => Message.find({})
   },
   Mutation: {
      sendMessage: async (_: any, { from, message }: MessageType) => {
         const newMessage = await Message.create({ from, message, created_at: new Date() });
         await pubsub.publish(MESSAGE_SENT, { messageSent: newMessage });
         return newMessage;
      },
      clearMessages: () => {
         try {
            Message.collection.drop();
            return 'SUCCESS';
         } catch (error) {
            return 'FAILURE';
         }
      }
   },
   Subscription: {
      messageSent: {
         subscribe: () => pubsub.asyncIterator([MESSAGE_SENT])
      }
   }
};
