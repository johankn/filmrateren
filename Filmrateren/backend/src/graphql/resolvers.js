const Movie = require('../models/movie');

const resolvers = {
  Query: {
    searchMovies: async (_, { title }) => {
      // Use a regex for case-insensitive and partial matching
      return await Movie.find({ title: new RegExp(title, 'i') });
    },
    getFilteredMovies: async (
      _,
      { title, genres, providers, sort, checkbox, limit, skip }
    ) => {
      if (
        !sort &&
        ((genres && genres.length > 0) || (providers && providers.length > 0))
      ) {
        const matchConditions = {};

        if (genres.length > 0 && providers.length > 0) {
          // Both genres and providers are provided
          matchConditions.$and = [
            { title: new RegExp(title, 'i') },

            {
              $and: [
                { providers: { $in: providers } },
                { genres: { $in: genres } }
              ]
            }
          ];
        } else {
          // Either genres or providers are provided
          matchConditions.$and = [
            { title: new RegExp(title, 'i') },
            {
              $or: [
                { providers: { $in: providers } },
                { genres: { $in: genres } }
              ]
            }
          ];
        }
        // Aggregation pipeline to retrieve movies with at least one match
        const atLeastOneMatchPipeline = [
          {
            $match: matchConditions
          },
          {
            $addFields: {
              totalMatches: {
                $sum: [
                  { $size: { $setIntersection: [providers, '$providers'] } },
                  { $size: { $setIntersection: [genres, '$genres'] } }
                ]
              }
            }
          },
          {
            $sort: {
              totalMatches: -1
            }
          },
          {
            $limit: limit
          }
        ];

        const aggregatedMovies = await Movie.aggregate(atLeastOneMatchPipeline);
        return aggregatedMovies;
      } else {
        const query = {};

        if (title) {
          query.title = new RegExp(title, 'i'); // For case insensitive matching
        }

        if (genres && genres.length > 0) {
          query.genres = { $in: genres };
        }

        if (providers && providers.length > 0) {
          query.providers = { $in: providers };
        }

        if (checkbox && (sort === 'IMDB_DESC' || sort === 'IMDB_ASC')) {
          // Exclude records with "Unknown" IMDBrating
          query.IMDBrating = { $ne: 0 };
        } else if (
          checkbox &&
          (sort === 'RELEASEYEAR_DESC' || sort === 'RELEASEYEAR_ASC')
        ) {
          // Exclude records with "Unknown" releaseYear
          query.releaseYear = { $ne: '0' };
        } else if (
          checkbox &&
          (sort === 'RUNTIME_DESC' || sort === 'RUNTIME_ASC')
        ) {
          // Exclude records with "Unknown" runtime
          query.runtime = { $ne: 0 };
        } else if (checkbox && sort === 'POPULARITY_DESC') {
          // Exclude records with "Unknown" score
          query.score = { $ne: 0 };
        }

        let sortOption = {};

        switch (sort) {
          case 'ALPHABETICAL_ASC':
            sortOption = { title: 1 }; // 1 means ascending order in MongoDB
            break;
          case 'ALPHABETICAL_DESC':
            sortOption = { title: -1 }; // -1 means descending order in MongoDB
            break;
          case 'IMDB_DESC':
            sortOption = { IMDBrating: -1 };
            break;
          case 'IMDB_ASC':
            sortOption = { IMDBrating: 1 };
            break;
          case 'RELEASEYEAR_DESC':
            sortOption = { releaseYear: -1 };
            break;
          case 'RELEASEYEAR_ASC':
            sortOption = { releaseYear: 1 };
            break;
          case 'RUNTIME_DESC':
            sortOption = { runtime: -1 };
            break;
          case 'RUNTIME_ASC':
            sortOption = { runtime: 1 };
            break;
          case 'POPULARITY_DESC':
            sortOption = { score: -1 };
            break;
          default:
            break; // No sorting
        }
        return await Movie.find(query).sort(sortOption).limit(limit).skip(skip);
      }
    },
    getMovieByID: async (_, { movieId }) => {
      const movie = await Movie.findOne({ id: movieId });

      if (!movie) {
        throw new Error('Movie not found');
      }

      return movie;
    },

    getAvailableFilters: async (_, { title, genres, providers }) => {
      // Filter movies based on title and providers to get availableGenres

      let providersQuery = {};
      let genresQuery = {};

      if (title && genres && genres.length > 0) {
        providersQuery = {
          title: new RegExp(title, 'i'),
          genres: { $in: genres }
        };
      } else if (title) {
        providersQuery = {
          title: new RegExp(title, 'i')
        };
      } else if (genres && genres.length > 0) {
        providersQuery = {
          genres: { $in: genres }
        };
      }

      const providersFilteredMovies = await Movie.find(providersQuery);

      // Extract distinct genres from the filtered movies
      const availableProviders =
        Array.from(
          new Set(providersFilteredMovies.flatMap((movie) => movie.providers))
        ) || [];

      if (title && providers && providers.length > 0) {
        genresQuery = {
          title: new RegExp(title, 'i'),
          providers: { $in: providers }
        };
      } else if (title) {
        genresQuery = {
          title: new RegExp(title, 'i')
        };
      } else if (providers && providers.length > 0) {
        genresQuery = {
          providers: { $in: providers }
        };
      }

      const genresFilteredMovies = await Movie.find(genresQuery);

      // Extract distinct providers from the filtered movies
      const availableGenres =
        Array.from(
          new Set(genresFilteredMovies.flatMap((movie) => movie.genres))
        ) || [];

      return { availableGenres, availableProviders };
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
    deleteReview: async (_, { movieId, comment }) => {
      try {
        const movie = await Movie.findOne({ id: movieId });

        if (!movie) {
          throw new Error('Movie not found');
        }

        const reviewIndex = movie.userRatings.findIndex(
          (review) => review.comment === comment
        );

        if (reviewIndex !== -1) {
          // Remove the review from the array
          movie.userRatings.splice(reviewIndex, 1);

          // Save the movie with the updated userRatings array
          await movie.save();

          return true; // Deletion successful
        } else {
          return false; // Review not found or not deleted
        }
      } catch (error) {
        console.error(error);
        return false; // Error during deletion
      }
    }
  }
};

module.exports = resolvers;
