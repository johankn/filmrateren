import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql', 
  credentials: 'include', 
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
