const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');

const mongoose = require('./config/db');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const morgan = require('morgan');
//ApolloServer can be started by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Initialize an Express application
const app = express();
app.use(morgan('dev'));

//Use the Express application as middleware in Apollo server
apolloServer.applyMiddleware({ app });
const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 4000;
httpServer.listen({ port: PORT }, () => {
   console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
   console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
});

export {};
