const { gql } = require('apollo-server-express')
module.exports = gql`
   type Message {
      body: String!
      created_at: String!
      author: String!
   }

   type Query {
      messages: [Message]
   }

   type Mutation {
      addMessage(body: String!, author: String!): Message!
   }
`;