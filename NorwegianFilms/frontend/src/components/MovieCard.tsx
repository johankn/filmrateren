import "./MovieCard.css"

function MovieCard() {
    type Movie = {
        id: string;
        title: string;
        picture: string; //TODO: find out how to get picture
        description: string;
        rating: number; //TODO: make RatingStars, issue #14
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
        <div className="title">
            <h1>{movie.title}</h1>
        </div>
        <div className="picture">
            <p>Insert picture here</p>
        </div>  
        <div className="info">
            <div className="keyinfo">
                <p>Sjanger: {movie.genre}</p>
                <p>Produsent: {movie.producer}</p>
                <p>Regi: {movie.director}</p>
            </div>
            <div className="rating">
                <p>Rating: {movie.rating}</p>
                <p>Insert rating stars here</p>
                <p>Insert rating button here</p>
            </div>
            <div className="description">
                <p>Description: {movie.description}</p>
            </div>
        </div>          
    </div>
    )
}

export default MovieCard;