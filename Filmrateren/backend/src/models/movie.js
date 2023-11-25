const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRatingSchema = new Schema({
  name: String,
  rating: Number,
  comment: String,
});

const movieSchema = new Schema({
  id: Number,
  title: String,
  plot: String,
  language: String,
  posterUrl: String,
  IMDBrating: Number,
  directors: [String],
  genres: [String],
  releaseYear: String,
  userRatings: [userRatingSchema], // an array of user ratings
  runtime: Number,
  IMDBnumber: Number,
  score: Number,
  providers: [String],
});

module.exports = mongoose.model("Movie", movieSchema, "movies");
