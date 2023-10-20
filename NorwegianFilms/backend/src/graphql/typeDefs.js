const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    plot: String!
    language: String!
    posterUrl: String!
    IMDBrating: Float!
    directors: [String!]!
    genres: [String!]!
    releaseYear: String!
    userRatings: [UserRating!]!
  }

  type UserRating {
    name: String!
    rating: Float!
    comment: String!
  }

  type Query {
    getAllMovies: [Movie]
  }

  type Query {
    movies(title: String!): [Movie]
  }

  input UserRatingInput {
    name: String!
    rating: Float!
    comment: String
  }

  type Mutation {
    addRatingToMovie(movieId: ID!, rating: UserRatingInput!): Movie!
  }
`;

module.exports = typeDefs;