import { gql } from '@apollo/client';

export const ADD_RATING_TO_MOVIE = gql`
  mutation ($movieId: ID!, $rating: UserRatingInput!, $avgUserRating: Float!) {
    addRatingToMovie(movieId: $movieId, rating: $rating, avgUserRating: $avgUserRating) {
      id
      userRatings {
        name
        rating
        comment
      }
    }
  }
`;
