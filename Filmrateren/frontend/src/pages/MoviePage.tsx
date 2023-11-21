import { useNavigate, useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import RatingPopup from '../components/RatingPopup';
import { useState } from 'react';
import RatingCard from '../components/RatingCard';
import ScrollToTop from '../components/ScrollToTop';
import { GET_MOVIE_BY_ID_QUERY } from '../queries/SearchQueries';
import { useQuery } from '@apollo/client';
import { Movie } from '../components/types';

function MoviePage() {
  const { movieID } = useParams<{ movieID: string }>();
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID_QUERY, {
    variables: { movieId: Number(movieID) },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Data', data);

  const movie: Movie | undefined = data.getMovieByID;
  if (!movie) return <p>Movie not found</p>;

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!movieID) {
    return <div>Movie ID is missing!</div>;
  }

  console.log(movie);

  return (
    <div className="movie-page">
      <div className={`relative min-h-screen ${showPopup ? 'blur-sm' : ''}`}>
        <ScrollToTop />
        <nav className="fixed top-0 left-0 p-4">
          <button className="hover:scale-125" onClick={() => navigate(-1)}>
            <span className="custom-arrow-icon text-white text-medium sm:text-large md:text-xl lg:text-twoxl ">←</span>
          </button>
        </nav>
        <main className="pt-7 ">
          <MovieCard movie={movie} />
        </main>
        <div className="flex md:justify-center justify-center mx-auto w-full md:ml-28 pb-8  ">
            <button
              className="ml-5 rounded-lg w-24 h-8 sm:w-36 sm:h-12 md:w-44 md:h-14 text-white text-small sm:text-base md:text-lg border-2 border-yellow hover:scale-110 hover:bg-darkpurple"
              onClick={() => setShowPopup(true)}>
              Rate filmen
            </button>
        </div>
        <section className="p-10">
          <h1 className="font-bold text-white mb-4 mx-auto w-4/6 sm:text-base md:text-base lg:text-large">
            RATINGS ({movie.userRatings.length})
          </h1>
          {movie.userRatings.map((rating, index) => (
            <div key={index} className="mt-6 mb-6 mx-auto w-4/6 ">
              <RatingCard name={rating.name} rating={rating.rating} comment={rating.comment} />
            </div>
          ))}
        </section>
      </div>{' '}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <RatingPopup onClose={handleClosePopup} movieID={Number(movieID)} />
      </div>
      )}
    </div>
  );
};

export default MoviePage;
