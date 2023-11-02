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
    getFilteredMovies(title: String, genres: [String!], sort: String, limit: Int, skip: Int): [Movie]
    searchMovies(title: String!): [Movie]
    getMovieByID(movieId: ID!): Movie!
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