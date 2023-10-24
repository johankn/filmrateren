const Movie = require('../models/movie');

const resolvers = {
  Query: {
    searchMovies: async (_, { title }) => {
        // Use a regex for case-insensitive and partial matching
        return await Movie.find({ title: new RegExp(title, 'i') });
    },
    getAllMovies: async () => {
      return await Movie.find();
  },
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
