const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:EJYez2cLugo6oyeU@it2810-05.idi.ntnu.no:27017/moviesDB?authSource=admin&authMechanism=DEFAULT', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to the Database');
});

const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');

const corsOptions = {
  origin: 'http://it2810-05.idi.ntnu.no',
  // origin: 'http://localhost:5173',
  // origin: 'https://studio.apollographql.com', 
  credentials: true  // allows cookies to be sent with the request
};

const app = express();
app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: false,
});

async function startApolloServer() {
  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://it2810-05.idi.ntnu.no:4000${server.graphqlPath}`);
  });
}

startApolloServer();






