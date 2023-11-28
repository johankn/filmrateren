import gql from 'graphql-tag';

export const SEARCH_MOVIES_QUERY = gql`
  query ($title: String!) {
    searchMovies(title: $title) {
      id
      title
    }
  }
`;

export const GET_FILTERED_MOVIES_QUERY = gql`
  query (
    $title: String
    $genres: [String!]
    $providers: [String!]
    $sort: String
    $checkbox: Boolean
    $limit: Int
    $skip: Int
  ) {
    getFilteredMovies(
      title: $title
      genres: $genres
      providers: $providers
      sort: $sort
      checkbox: $checkbox
      limit: $limit
      skip: $skip
    ) {
      id
      title
      genres
      providers
      posterUrl
    }
  }
`;

export const GET_MOVIE_BY_ID_QUERY = gql`
  query ($movieId: ID!) {
    getMovieByID(movieId: $movieId) {
      id
      title
      releaseYear
      genres
      directors
      plot
      IMDBrating
      posterUrl
      userRatings {
        name
        rating
        comment
      }
      runtime
      IMDBnumber
      score
      providers
    }
  }
`;

export const GET_AVAILABLE_FILTERS_QUERY = gql`
  query ($title: String, $genres: [String!], $providers: [String!]) {
    getAvailableFilters(title: $title, genres: $genres, providers: $providers) {
      availableGenres
      availableProviders
    }
  }
`;
