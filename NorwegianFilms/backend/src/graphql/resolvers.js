const Movie = require('../models/movie');

const resolvers = {
  Query: {
    movies: async () => {
      return await Movie.find({});
    }
  },
  Mutation: {
    addRatingToMovie: async (_, { movieId, rating }) => {
      // Find the movie by its ID from the JSON
      const movie = await Movie.findOne({ id: movieId });
      
      if (!movie) {
        throw new Error('Movie not found');
      }
      
      // Add the new rating to the movie's userRatings array
      movie.userRatings.push(rating);
      
      // Save the movie with the new rating
      await movie.save();
      
      // Return the updated movie
      return movie;
    },
  },
};

module.exports = resolvers;
