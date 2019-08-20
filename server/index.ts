const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const morgan = require("morgan");
const mongoose = require('./config/db')
//ApolloServer can be started by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize an Express application
const app = express();
app.use(morgan('dev'));

//Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

const port = 3001 || process.env.PORT;
app.listen(port, () => {
   console.log(`🚀  Server ready at http://localhost:${port}${server.graphqlPath}`);
});


export {}