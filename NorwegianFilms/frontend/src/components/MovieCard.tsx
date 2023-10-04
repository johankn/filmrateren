import movieFile from "../../../backend/src/movies.json";


type MovieCardProps = {
  movieID: string;
};

function MovieCard({ movieID }: MovieCardProps) {
  type Movie = {
    id: number; 
    title: string;
    director: string;
    releaseYear: number;
    genre: string;
    "IMDBrating": number; 
    posterUrl: string;
    userRatings: { 
      name: string; 
      rating: number; 
      comment: string; 
    }[];
  };
    
  // Find the specific movie by ID
  const movie: Movie | undefined = movieFile.movies.find((m) => m.id === Number(movieID));

  if (!movie) return <p>Movie not found</p>;
    
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
                <p>Regi: {movie.director}</p>
            </div>
            <div className="rating">
                <p>Rating: {movie.IMDBrating}</p>
                <p>Insert rating stars here</p>
                <p>Insert rating button here</p>
            </div>
        </div>          
    </div>
    )
}

export default MovieCard;