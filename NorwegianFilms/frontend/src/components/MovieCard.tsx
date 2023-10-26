import movieFile from '../../../backend/src/norwegian_movies.json';
import Stars from './Stars';
import { Movie } from './types';

export type MovieCardProps = {
  movieID: string;
};

function MovieCard({ movieID }: MovieCardProps) {
  const movie: Movie | undefined = movieFile.movies.find((m) => m.id === Number(movieID));

  if (!movie) return <p>Movie not found</p>;

  const totalUserRatings = movie.userRatings.reduce((acc, curr) => acc + curr.rating, 0);

  const averageUserRating = movie.userRatings.length > 0 ? totalUserRatings / movie.userRatings.length : 0;

  return (
    <div className="grid grid-rows-auto-auto  gap-7 p-10 ml-2 text-white italic place-items-center ">
      <div className="grid-row-1 grid-col-1-span-2 text-large sm:text-xl md:text-xl lg:text-twoxl ">
        <h1>{movie.title}</h1>
      </div>

      <div className="flex flex-wrap w-2/3  ">
        <div className=" image  w-full md:w-1/2 md:pr-1 ">
          <img src={movie.posterUrl} alt={movie.title} />
        </div>

        <div className="mt-6 info md:w-1/2 md:pl-4 w-full text-small sm:text-base md:text-small lg:text-base ">
          <div className="mb-5">
            <p className='mb-2'>
              <span className="font-bold">Sjanger: </span> {movie.genres}
            </p>
            <p className='mb-2'>
              <span className="font-bold">Regi: </span>
              {movie.directors}
            </p>
            <p className='mb-2'>
              <span className="font-bold">Utgivelsesår: </span>
              {movie.releaseYear}
            </p>
            <p>
              <span className="font-bold">Beskrivelse: </span>
              {movie.plot}
            </p>
          </div>
          <div className="rating">
            <p className='mb-2'>
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
