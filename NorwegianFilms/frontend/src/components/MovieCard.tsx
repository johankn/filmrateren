function MovieCard() {
    type Movie = {
        id: string;
        title: string;
        picture: string; //TODO: find out how to get picture
        description: string;
        rating: number;
        genre: string;
        producer: string; 
        director: string;
      };
    
      const movie: Movie =
        // Sample movie data
        {
          id: '1',
          title: 'Movie 1',
          picture: 'url_to_movie_image_1',
          description: 'Movie description',
          rating: 4.5,
          genre: 'Action',
          producer: 'Producer 1',
          director: 'Director 1',
        }
    
    return (
    <div className="movieCard">
        <h1>{movie.title}</h1>
        <div className="moviePicAndInfo">
            <img src={movie.picture} alt="" />
            <div className="movieInfo">
                <p>Description: {movie.description}</p>
                <p>Rating: {movie.rating}</p>
                <p>Genre: {movie.genre}</p>
                <p>Producer: {movie.producer}</p>
                <p>Director: {movie.director}</p>
            </div>
        </div>
    </div>
    )
}

export default MovieCard;