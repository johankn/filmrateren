import movieFile from '../../../backend/src/norwegian_movies.json';
import './SearchHitCard.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import noPoster from '../assets/noImage.png';

type SearchHitCardProps = {
  movieID: string;
  smallScreen: boolean;
};

function SearchHitCard({ movieID, smallScreen }: SearchHitCardProps) {
  type Movie = {
    id: number;
    title: string;
    directors: Array<string>;
    releaseYear: string;
    genres: Array<string>;
    IMDBrating: number;
    posterUrl: string;
    userRatings: {
      name: string;
      rating: number;
      comment: string;
    }[];
  };

  const movie: Movie | undefined = movieFile.movies.find((m) => m.id === Number(movieID));
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [titleOverflow, setTitleOverflow] = useState(false);

  const checkTitleOverflow = () => {
    if (h1Ref.current) {
      const isOverflowing = h1Ref.current.scrollWidth > h1Ref.current.clientWidth;
      setTitleOverflow(isOverflowing);
    }
  };

  let posterHeight;
  let titleHeight;
  let titleWidth;

  if (smallScreen) {
    (posterHeight = '7.9'), (titleHeight = '10'), (titleWidth = '5');
  } else {
    (posterHeight = '17.8'), (titleHeight = '20'), (titleWidth = '13');
  }

  // Use useEffect to check for title overflow on component mount and when the movie changes
  useEffect(() => {
    checkTitleOverflow();
  }, [movieID]); // Change this to watch 'movieID' instead of 'movie'

  if (!movie) return <p>Movie not found {movieID}</p>;

  return (
    <div
      className="text-white italic flex flex-col justify-center items-center"
      style={{
        height: `${titleHeight}rem`,
        width: `${titleWidth}rem`,
      }}
    >
      <Link to={`/project2/moviePage/${movieID}`}>
        <h1 ref={h1Ref} className={`text-center ${titleOverflow ? 'text-small' : ''} truncate`}>
          {movie.title}
        </h1>
        <div className="flex justify-center items-center h-full moviePoster">
          <img
            src={movie.posterUrl === 'https://image.tmdb.org/t/p/w500None' ? noPoster : movie.posterUrl}
            alt={movie.title}
            style={{
              height: `${posterHeight}rem`,
              maxWidth: '100%',
              borderRadius: '1rem',
            }}
            className="max-h-full max-w-full"
          />
        </div>
      </Link>
    </div>
  );
}

export default SearchHitCard;
