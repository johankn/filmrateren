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
query($title: String, $genres: [String!], $sort: String, $limit: Int, $skip: Int) {
  getFilteredMovies(title: $title, genres: $genres, sort: $sort, limit: $limit, skip: $skip) {
    id
    title
    genres
  }
}
`;

export const GET_MOVIE_BY_ID_QUERY = gql`
  query($id: ID!) {
    getMovieByID(id: $id) {
      id
      title
      releaseYear
      genres
      directors
      plot
      IMDBrating
      posterUrl
    }
  }
`;


