import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import noPoster from '../assets/noImage.png';
import { Movie } from './types';

type SearchHitCardProps = {
  movie: Movie;
  smallScreen: boolean;
};

function SearchHitCard({ movie, smallScreen }: SearchHitCardProps) {
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
    (posterHeight = '10'), (titleHeight = '10'), (titleWidth = '7');
  } else {
    (posterHeight = '17.8'), (titleHeight = '20'), (titleWidth = '13');
  }

  // Use useEffect to check for title overflow on component mount and when the movie changes
  useEffect(() => {
    checkTitleOverflow();
  }, [movie]); // Change this to watch 'movieID' instead of 'movie'

  if (!movie) return <p>Movie not found {movie}</p>;

  return (
    <div
      className="text-white italic flex flex-col justify-center items-center"
      style={{
        height: `${titleHeight}rem`,
        width: `${titleWidth}rem`,
      }}
    >
      <Link to={`/project2/moviePage/${movie.id}`}>
        <h1 ref={h1Ref} className={`text-center ${titleOverflow ? 'text-small' : ''} truncate`}>
          {movie.title}
        </h1>
        <div className="flex justify-center items-center h-full group">
          <img
            src={movie.posterUrl === 'https://image.tmdb.org/t/p/w500None' ? noPoster : movie.posterUrl}
            alt={movie.title}
            style={{
              height: `${posterHeight}rem`,
              maxWidth: '100%',
              borderRadius: '1rem',
            }}
            className="max-h-full max-w-full group-hover:border-[rgb(41,93,227)] group-hover:border-2"
          />
        </div>
      </Link>
    </div>
  );
}

export default SearchHitCard;
