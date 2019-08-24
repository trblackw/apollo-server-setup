import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
const gqlPathName = 'localhost:4000/graphql';

const httpLink = createHttpLink({
   uri: `http://${gqlPathName}`
});

const wsLink = new WebSocketLink({
   uri: `ws://${gqlPathName}`,
   options: {
      reconnect: true
      //   lazy: true
   }
});

const terminatingLink = split(
   // split based on operation type
   ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
   },
   wsLink,
   httpLink
);

const link = ApolloLink.from([terminatingLink]);

const client = new ApolloClient({
   link,
   cache: new InMemoryCache()
});

ReactDOM.render(
   <ApolloProvider client={client}>
      <App />
   </ApolloProvider>,
   document.getElementById('root')
);
