import Stars from './Stars';
import noPoster from '../assets/noImage.png';
import { Movie } from './types';
import Speech from 'react-text-to-speech';
import { AiFillSound } from 'react-icons/ai';
import { FaVolumeMute } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { showPopupState } from '../atoms';

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const totalUserRatings = movie.userRatings.reduce((acc, curr) => acc + curr.rating, 0);

  const averageUserRating = movie.userRatings.length > 0 ? totalUserRatings / movie.userRatings.length : 0;

  const [showMore, setShowMore] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_showPopup, setShowPopup] = useRecoilState(showPopupState);

 // cancel Text-to-Speech if the card is reloaded
  useEffect(() => {
    if (window.speechSynthesis) {
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  // Text-to-Speech buttons
  const startBtn = (
    <button className="text-medium sm:text-large md:text-xl transform hover:scale-125 transition-transform">
      <AiFillSound></AiFillSound>
    </button>
  );
  const pauseBtn = (
    <button className="text-medium sm:text-large md:text-xl transform hover:scale-125 transition-transform">
      <FaVolumeMute></FaVolumeMute>
    </button>
  );
  const stopBtn = (
    <button className="text-medium sm:text-large md:text-xl transform hover:scale-125 transition-transform">
      <IoMdRefresh></IoMdRefresh>
    </button>
  );
  return (
    <div className="movie-card grid max-h-full gap-7 md:mt-6 ml-2 text-white italic place-items-center ">
      {/* Speech component that reads out the movie information */}
      <Speech
        text={`${movie.title}. Sjanger er ${movie.genres.length < 1 ? 'Ukjent' : movie.genres.join(', ')}. Regi av: ${
          movie.directors.length < 1 ? 'Ukjent' : movie.directors.join(', ')
        }. Utgivelsesår er ${movie.releaseYear == 'Unknown' ? 'Ukjent' : movie.releaseYear}. Filmens varighet: ${
          movie.runtime == 0 ? 'Finner ingen varighet' : `${movie.runtime} minutter`
        }. Beskrivelse av filmen: ${movie.plot == '' ? 'Finner ingen beskrivelse' : movie.plot}.IMBD rating: ${
          movie.IMDBrating == 0 ? 'Ingen anmeldelser' : movie.IMDBrating
        }. Brukeranmeldelser: ${movie.userRatings.length < 1 ? 'Ingen anmeldelser' : averageUserRating.toFixed(1)} `}
        rate={0.8}
        startBtn={startBtn}
        pauseBtn={pauseBtn}
        stopBtn={stopBtn}
        lang="no-NO"
        onError={() => console.error('Browser not supported!')}
      />
      <h1 className="text-base sm:text-medium md:text-large lg:text-xl ">{movie.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-2/3 mb-2  ">
        {/* Movie poster */}
        <figure className=" flex justify-center items-start mt-5 md:justify-end  max-w-full">
          <img
            src={movie.posterUrl === 'https://image.tmdb.org/t/p/w500None' ? noPoster : movie.posterUrl}
            alt={movie.title}
            className="w-3/4 md:w-96 h-auto object-contain rounded-base shadow-2xl"
          />
        </figure>
        {/* Information about movie */}
        <section className="mt-4 text-small sm:text-baseSmall md:text-baseSmall lg:text-base pl-4">
          <p className="mb-2">
            <span className="font-bold">Sjanger: </span> {movie.genres.length < 1 ? 'Ukjent' : movie.genres.join(', ')}
          </p>
          <p className="mb-2">
            <span className="font-bold">Regi: </span>{' '}
            {movie.directors.length < 1 ? 'Ukjent' : movie.directors.join(', ')}
          </p>
          <p className="mb-2">
            <span className="font-bold">Utgivelsesår: </span> {movie.releaseYear == '0' ? 'Ukjent' : movie.releaseYear}
          </p>
          <p className="mb-2">
            <span className="font-bold">Varighet: </span>{' '}
            {movie.runtime == 0 ? 'Finner ingen varighet' : `${movie.runtime} min`}
          </p>
          {/* Movie plot */}
          <p>
            <span className="font-bold">Beskrivelse: </span>{' '}
            {
              // If the plot is more than 340 characters, the text will be cut off and a button will appear to show more text
              movie.plot == ''
                ? 'Finner ingen beskrivelse'
                : showMore
                ? `${movie.plot} `
                : movie.plot.length <= 340
                ? movie.plot
                : `${movie.plot.substring(0, 340)}... `
            }
            {movie.plot.length > 340 ? (
              // The button updates the number of characters shown
              <button className="italic text-[#facc15]" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Vis mindre' : 'Vis mer'}
              </button>
            ) : null}
          </p>
          {/* IMDB-rating */}
          <p className="mt-5 mb-2">
            <span className="font-bold">IMDB-rating:</span>{' '}
            {
              // Show the IMDB rating and number of reviews in a fitting format
              movie.IMDBrating == 0
                ? 'Ingen anmeldelser'
                : `${movie.IMDBrating} / 10 (${
                    movie.IMDBnumber < 1000
                      ? movie.IMDBnumber
                      : movie.IMDBnumber < 10000
                      ? (movie.IMDBnumber / 1000).toFixed(1) + 'K'
                      : (movie.IMDBnumber / 1000).toFixed(0) + 'K'
                  })`
            }
          </p>
          {/* User-rating */}
          <span className="font-bold">Bruker-rating:</span>{' '}
          {movie.userRatings.length < 1 ? 'Ingen anmeldelser' : `${averageUserRating.toFixed(1)} / 5.0`}
          <figure className="flex text-yellow">
            <Stars rating={parseFloat(averageUserRating.toFixed(1))} />
          </figure>
          {/* Rate movie-button that updates the popup state for rating the movie, which is handled in the MoviePage*/}
          <button
            className="mt-5 rounded-base w-24 h-8 sm:w-36 sm:h-12 md:w-44 md:h-14 text-white text-small sm:text-base md:text-lg border-2 border-yellow hover:scale-110 hover:bg-darkpurple"
            onClick={() => setShowPopup(true)}
          >
            Rate filmen
          </button>
        </section>
      </div>
    </div>
  );
}

export default MovieCard;
