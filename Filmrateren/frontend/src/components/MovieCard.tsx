import Stars from './Stars';
import noPoster from '../assets/noImage.png';
import { Movie } from './types';
import Speech from 'react-text-to-speech';
import { AiFillSound } from 'react-icons/ai';
import { FaVolumeMute } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import { useEffect } from 'react';

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const startBtn = (
    <button className="text-large transform hover:scale-125 transition-transform">
      <AiFillSound></AiFillSound>
    </button>
  );
  const pauseBtn = (
    <button className="text-large transform hover:scale-125 transition-transform">
      <FaVolumeMute></FaVolumeMute>
    </button>
  );
  const stopBtn = (
    <button className="text-large transform hover:scale-125 transition-transform">
      <IoMdRefresh></IoMdRefresh>
    </button>
  );
  return (
    <div className="grid max-h-full gap-7 mt-6 ml-2 text-white italic place-items-center  ">
      <Speech
        text={`${movie.title}. Sjanger er ${movie.genres.length < 1 ? 'Ukjent' : movie.genres.join(', ')}. Regi av: ${
          movie.directors.length < 1 ? 'Ukjent' : movie.directors.join(', ')
        }. Utgivelsesår er ${movie.releaseYear == 'Unknown' ? 'Ukjent' : movie.releaseYear}. Beskrivelse av filmen: ${
          movie.plot == '' ? 'Finner ingen beskrivelse' : movie.plot
        }.IMBD rating: ${movie.IMDBrating == 0 ? 'Ingen anmeldelser' : movie.IMDBrating}. Brukeranmeldelser: ${
          movie.userRatings.length < 1 ? 'Ingen anmeldelser' : movie.avgUserRating.toFixed(1)
        } `}
        rate={0.8}
        startBtn={startBtn}
        pauseBtn={pauseBtn}
        stopBtn={stopBtn}
        onError={() => console.error('Browser not supported!')}
      />
      <div className="text-base sm:text-medium md:text-large lg:text-xl ">
        <h1>{movie.title}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-2/3 mb-4   ">
        <div className="flex flex-col">
          <div className="mt-9 flex justify-center md:justify-end max-w-full  ">
            <img
              src={movie.posterUrl === 'https://image.tmdb.org/t/p/w500None' ? noPoster : movie.posterUrl}
              alt={movie.title}
              className="w-3/4 md:w-96 h-auto object-contain"
            />
          </div>
        </div>
        <div className="mt-8  info text-xsmall sm:text-small md:text-small lg:text-base pl-4 ">
          <div className="mb-5">
            <p className="mb-2">
              <span className="font-bold">Sjanger: </span>{' '}
              {movie.genres.length < 1 ? 'Ukjent' : movie.genres.join(', ')}
            </p>
            <p className="mb-2">
              <span className="font-bold">Regi: </span>{' '}
              {movie.directors.length < 1 ? 'Ukjent' : movie.directors.join(', ')}
            </p>
            <p className="mb-2">
              <span className="font-bold">Utgivelsesår: </span>{' '}
              {movie.releaseYear == '0' ? 'Ukjent' : movie.releaseYear}
            </p>
            <p className="mb-2">
              <span className="font-bold">Varighet: </span>{' '}
              {movie.runtime == 0 ? 'Finner ingen varighet' : `${movie.runtime} min`}
            </p>
            <p>
              <span className="font-bold">Beskrivelse: </span>{' '}
              {movie.plot == '' ? 'Finner ingen beskrivelse' : movie.plot}
            </p>
          </div>
          <div className="rating">
            <p className="mb-2">
              <span className="font-bold">IMDB-rating:</span>{' '}
              {movie.IMDBrating == 0 ? 'Ingen anmeldelser' : `${movie.IMDBrating} / 10`}
            </p>
            <div> </div>
            <div>
              <p>
                <span className="font-bold">Bruker-rating:</span>{' '}
                {movie.userRatings.length < 1 ? 'Ingen anmeldelser' : `${movie.avgUserRating.toFixed(1)} / 5.0`}
              </p>
              <div className="flex text-yellow">
                <Stars rating={parseFloat(movie.avgUserRating.toFixed(1))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
