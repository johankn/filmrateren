const mongoose = require('mongoose');
const Movie = require('./src/models/movie');
const moviesData = require('./src/norwegian_movies.json');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moviesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Drop the existing movies collection if it exists
    await mongoose.connection.collection('movies').drop();
  } catch (error) {
    console.log('Movies collection does not exist. Skipping drop...');
  }

  async function importData() {
    try {
        await Movie.insertMany(moviesData.movies);
        console.log('Data import completed.');
    } catch (error) {
        console.error('Error inserting data: ', error);
    } finally {
        mongoose.connection.close();
    }
}

importData();
});
