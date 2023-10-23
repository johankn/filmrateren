import movieFile from '../../../backend/src/movies.json';
import Stars from './Stars';

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
    IMDBrating: number;
    posterUrl: string;
    userRatings: {
      name: string;
      rating: number;
      comment: string;
    }[];
  };

  const movie: Movie | undefined = movieFile.movies.find((m) => m.id === Number(movieID));

  if (!movie) return <p>Movie not found</p>;

  const totalUserRatings = movie.userRatings.reduce((acc, curr) => acc + curr.rating, 0);

  const averageUserRating = movie.userRatings.length > 0 ? totalUserRatings / movie.userRatings.length : 0;

  return (
    <div className="grid grid-rows-auto-auto  gap-7 p-10 ml-2 text-white italic place-items-center ">
      <div className="grid-row-1 grid-col-1-span-2  text-twoxl">
        <h1>{movie.title}</h1>
      </div>
  
      <div className="grid grid-rows-auto-auto md:grid-rows-auto md:grid-cols-auto w-3/5 md:grid-cols-2 gap-4 place-items-center">
        <div className="image">
          <img src={movie.posterUrl} alt={movie.title} />
        </div>
  
        <div className="info text-2xl ">
          <div className="mb-6 ">
            <p>
              <span className="font-bold">Sjanger: </span> {movie.genre}
            </p>
            <p>
              <span className="font-bold">Regi: </span>
              {movie.director}
            </p>
          </div>
          <div className="rating">
            <p>
              <span className="font-bold">IMDB rating:</span> {movie.IMDBrating}
            </p>
            <div> </div>
            <div>
              <p>
                <span className="font-bold">Average user rating:</span> {averageUserRating.toFixed(1)}
              </p>
              <div className="text-yellow text-left">
                <Stars rating={parseFloat(averageUserRating.toFixed(1))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}
export default MovieCard;
