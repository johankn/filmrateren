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
    <div className="grid grid-rows-auto-auto grid-cols-1fr-1fr gap-7 p-10 ml-2 text-white italic">
      <div className="grid-row-1 grid-col-1-span-2 text-large">
        <h1>{movie.title}</h1>
      </div>

      <div className="flex flex-wrap w-1/2 ">
        <div className=" image md:w-1/2 md:pr-1 w-full">
          <img src={movie.posterUrl} alt={movie.title} />
        </div>

        <div className="info md:w-1/2 md:pl-4 w-full">
          <div className="mb-6">
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
              <div className="flex text-yellow">
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
