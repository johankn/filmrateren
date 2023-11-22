import { useNavigate } from 'react-router-dom';
import noPoster from '../assets/noImage.png';
import { Movie } from './types';

type SearchHitCardProps = {
  movie: Movie;
  smallScreen: boolean;
};

function SearchHitCard({ movie, smallScreen }: SearchHitCardProps) {
  const navigate = useNavigate(); // Get the navigate function

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
          className={`h-10 flex flex-col justify-end ${smallScreen ? 'w-40' : 'w-52'} ${
            smallScreen ? 'text-small' : 'text-base'
          } leading-5`}
        >
          <h1 className="text-center overflow-hidden line-clamp-2">{movie.title}</h1>
        </figcaption>
        <figure className={`flex justify-center items-center ${smallScreen ? 'h-[95%]' : 'h-full'} group`}>
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
