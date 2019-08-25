const { gql } = require('apollo-server-express')
module.exports = gql`
   type Message {
      id: String!,
      from: String!,
      message: String!
      created_at: String!
   }

   type Query {
      messages: [Message]
   }

   type Mutation {
      sendMessage(from: String!, message: String!): Message!
      clearMessages: String!
   }

   type Subscription {
      messageSent: Message!
   }
`;