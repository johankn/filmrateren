import { useRef } from 'react';
import { Link } from 'react-router-dom';
import noPoster from '../assets/noImage.png';
import { Movie } from './types';

type SearchHitCardProps = {
  movie: Movie;
  smallScreen: boolean;
};

function SearchHitCard({ movie, smallScreen }: SearchHitCardProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  let posterHeight;
  let titleHeight;
  let titleWidth;

  if (smallScreen) {
    (posterHeight = '12'), (titleHeight = '14'), (titleWidth = '7.4');
  } else {
    (posterHeight = '17.8'), (titleHeight = '21'), (titleWidth = '13');
  }

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
        <div className={`h-10 flex flex-col justify-end ${smallScreen ? 'w-40' : 'w-52'} leading-5 h-10 line-clamp-2`}>
          <h1
            ref={h1Ref}
            className={`text-center overflow-hidden ${
              smallScreen ? 'text-small' : 'text-base'
            } leading-5 h-10 line-clamp-2 flex flex-col justify-end`}
          >
            {movie.title}
          </h1>
        </div>
        <div className={`flex justify-center items-center ${smallScreen ? 'h-[95%]' : 'h-full'} group`}>
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
