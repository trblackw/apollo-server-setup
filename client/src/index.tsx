import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const link = createHttpLink({
   uri: 'http://localhost:4000/'
});

// const authLink = setContext((_, { headers }) => ({
//    headers: {
//       'api-key': 'my secret key'
//    }
// }))

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
