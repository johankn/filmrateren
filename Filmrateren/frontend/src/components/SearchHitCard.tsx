import { useNavigate } from 'react-router-dom';
import noPoster from '../assets/noImage.png';
import { Movie } from './types';

type SearchHitCardProps = {
  movie: Movie;
  screenSize: string;
};

function SearchHitCard({ movie, screenSize }: SearchHitCardProps) {
  const navigate = useNavigate(); // Get the navigate function

  let posterHeight;
  let titleHeight;
  let titleWidth;

  // Adjust the size of the poster and title based on the screen size
  if (screenSize == 'small') {
    (posterHeight = '12'), (titleHeight = '14'), (titleWidth = '7.4');
  } else if (screenSize == 'medium') {
    (posterHeight = '14'), (titleHeight = '16'), (titleWidth = '10');
  } else {
    (posterHeight = '17.8'), (titleHeight = '21'), (titleWidth = '13');
  }

  if (!movie) return <p>Movie not found {movie}</p>;

  return (
    <button
      className="text-white italic flex flex-col justify-center items-center"
      style={{
        height: `${titleHeight}rem`,
        width: `${titleWidth}rem`,
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          navigate(`/project2/moviePage/${movie.id}`);
        }
      }}
    >
      <a onClick={() => navigate(`/project2/moviePage/${movie.id}`)}>
        <figcaption
          className={`h-10 flex flex-col justify-end ${screenSize == 'small' ? 'w-40' : 'w-52'} ${
            screenSize == 'small'
              ? 'text-small'
              : screenSize == 'small'
              ? 'text-base-small'
              : screenSize == 'medium'
              ? 'text-base-small'
              : 'text-base'
          } leading-5`}
        >
          {/* The tailwind styling makes sure the title only shows up in two lines, and if it does not fit, it is truncated with ... */}
          <h1 className="text-center overflow-hidden line-clamp-2">{movie.title}</h1>
        </figcaption>
        <figure
          className={`flex justify-center hover:scale-105 items-center ${
            screenSize == '' ? 'h-full' : 'h-[95%]'
          } group`}
        >
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
        </figure>
      </a>
    </button>
  );
}

export default SearchHitCard;
