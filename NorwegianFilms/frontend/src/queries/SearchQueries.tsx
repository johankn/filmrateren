import gql from 'graphql-tag';

export const SEARCH_MOVIES_QUERY = gql`
    query($title: String!) {
        searchMovies(title: $title) {
            id
            title
        }
    }
`;

export const GET_FILTERED_MOVIES_QUERY = gql`
query($title: String, $genres: [String!], $limit: Int, $skip: Int) {
  getFilteredMovies(title: $title, genres: $genres, limit: $limit, skip: $skip) {
    id
    title
    genres
  }
}
`;

export const GET_MOVIE_BY_ID_QUERY = gql`
  query GetMovieById($id: Int!) {
    movie(id: $id) {
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
    }
  }
`;


