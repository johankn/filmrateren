const { gql } = require('apollo-server-express');

// Definition of types used in the queries
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
    runtime: Int!
    IMDBnumber: Int!
    score: Float!
    providers: [String!]!
  }

  type UserRating {
    name: String!
    rating: Float!
    comment: String!
  }

  type Query {
    getFilteredMovies(
      title: String
      genres: [String!]
      providers: [String!]
      sort: String
      checkbox: Boolean
      limit: Int
      skip: Int
    ): [Movie]
    searchMovies(title: String!): [Movie]
    getMovieByID(movieId: ID!): Movie!
    getAvailableFilters(
      title: String
      genres: [String!]
      providers: [String!]
    ): FilterResults
  }

  input UserRatingInput {
    name: String!
    rating: Float!
    comment: String
  }

  type Mutation {
    addRatingToMovie(movieId: ID!, rating: UserRatingInput!): Movie!
    deleteReview(movieId: ID!, comment: String!): Boolean
  }

  type FilterResults {
    availableGenres: [String!]
    availableProviders: [String!]
  }
`;

module.exports = typeDefs;
