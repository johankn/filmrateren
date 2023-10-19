import gql from 'graphql-tag';

export const SEARCH_MOVIES_QUERY = gql`
    query SearchMovies($title: String!) {
        movies(title: $title) {
            id
            title
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


