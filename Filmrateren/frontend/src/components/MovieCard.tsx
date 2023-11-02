import Stars from './Stars';
import noPoster from '../assets/noImage.png';
import { Movie } from './types';

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const totalUserRatings = movie.userRatings.reduce((acc, curr) => acc + curr.rating, 0);

  const averageUserRating = movie.userRatings.length > 0 ? totalUserRatings / movie.userRatings.length : 0;

  return (
    <div className="grid max-h-full gap-7 mt-6 ml-2 text-white italic place-items-center  ">
      <div className="text-base sm:text-medium md:text-large lg:text-xl ">
        <h1>{movie.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-2/3 mb-4   ">
        <div className="mt-6 flex justify-center md:justify-end max-w-full  ">
          <img
            src={movie.posterUrl === 'https://image.tmdb.org/t/p/w500None' ? noPoster : movie.posterUrl}
            alt={movie.title}
            className="w-3/4 md:w-96 h-auto "
          />
        </div>
        <div className="mt-8  info text-xsmall sm:text-small md:text-small lg:text-base pl-4 ">
          <div className="mb-5">
            <p className="mb-2">
              <span className="font-bold">Sjanger: </span> {movie.genres.join(', ')}
            </p>
            <p className="mb-2">
              <span className="font-bold">Regi: </span> {movie.directors.join(', ')}
            </p>
            <p className="mb-2">
              <span className="font-bold">Utgivelsesår: </span> {movie.releaseYear}
            </p>
            <p>
              <span className="font-bold">Beskrivelse: </span> {movie.plot}
            </p>
          </div>
          <div className="rating">
            <p className="mb-2">
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
