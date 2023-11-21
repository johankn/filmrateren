import { gql } from '@apollo/client';

export const ADD_RATING_TO_MOVIE = gql`
  mutation ($movieId: ID!, $rating: UserRatingInput!) {
    addRatingToMovie(movieId: $movieId, rating: $rating) {
      id
      userRatings {
        name
        rating
        comment
      }
    }
  }
`;
