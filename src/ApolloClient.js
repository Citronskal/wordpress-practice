// src/ApolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost/wordpress/graphql', // Replace with your WordPress GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
