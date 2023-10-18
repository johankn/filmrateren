import movieFile from '../../../backend/src/norwegian_movies.json';
import './SearchHitCard.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type SearchHitCardProps = {
  movieID: string;
};

function SearchHitCard({ movieID }: SearchHitCardProps) {
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

  // Use useEffect to check for title overflow on component mount and when the movie changes
  useEffect(() => {
    checkTitleOverflow();
  }, [movieID]); // Change this to watch 'movieID' instead of 'movie'

  if (!movie) return <p>Movie not found {movieID}</p>;

  return (
    <div
      className="text-white italic flex flex-col justify-center items-center"
      style={{
        height: '20rem',
        width: '13rem',
      }}
    >
      <Link to={`/project2/moviePage/${movieID}`}>
        <h1 ref={h1Ref} className={`text-center ${titleOverflow ? 'text-small' : ''} truncate`}>
          {movie.title}
        </h1>
        <div className="flex justify-center items-center h-full moviePoster">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            style={{
              height: '17.8rem',
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
