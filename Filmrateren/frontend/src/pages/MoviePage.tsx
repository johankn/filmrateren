import { useNavigate, useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import RatingPopup from '../components/RatingPopup';
import { useState } from 'react';
import RatingCard from '../components/RatingCard';
import ScrollToTop from '../components/ScrollToTop';
import { GET_MOVIE_BY_ID_QUERY } from '../queries/SearchQueries';
import { useQuery } from '@apollo/client';
import { Movie } from '../components/types';
import { FaCheck } from 'react-icons/fa';
import StreamButton from '../components/StreamButton';
import { showPopupState } from '../atoms';
import { useRecoilState } from 'recoil';

function MoviePage() {
  const { movieID } = useParams<{ movieID: string }>();
  const [showPopup, setShowPopup] = useRecoilState(showPopupState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID_QUERY, {
    variables: { movieId: Number(movieID) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const movie: Movie | undefined = data.getMovieByID;
  if (!movie) return <p>Movie not found</p>;

  const handleClosePopup = async () => {
    setShowPopup(false);
    setShowSuccessMessage(false);
  };

  const handleRatingSuccess = () => {
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    if (!movieID) {
      return <div>Movie ID is missing!</div>;
    }
  };

  return (
    <div className="movie-page">
      <div className={`relative min-h-screen ${showPopup ? 'blur-sm' : ''}`}>
        {/* Scroll to top of page when rendered */}
        <ScrollToTop />
        <nav className="fixed top-0 left-0 p-4">
          <button className="hover:scale-125" onClick={() => navigate(-1)}>
            <span className="custom-arrow-icon text-white text-medium sm:text-large md:text-xl lg:text-twoxl ">←</span>
          </button>
        </nav>
        <main className="pt-7 ">
          {/* Movie card with information about movie */}
          <MovieCard movie={movie} />
        </main>
        {/* List of stream providers */}
        {movie.providers.length > 0 && (
          <section className="mt-14 mb-5 px-10">
            <p className="font-bold text-white mb-4 mx-auto w-4/6 sm:text-base md:text-base lg:text-base italic">
              Tilgjengelig på:{' '}
            </p>
            <div className="mx-auto w-4/6 flex flex-wrap gap-3">
              {movie.providers.map((index) => (
                <StreamButton key={index} provider={index} />
              ))}
            </div>
          </section>
        )}
        {/* User ratings */}
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
      </div>
      {/* Success message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <span className="success-message bg-darkpurple text-base md:text-medium text-white p-3 rounded-lg">
            Ratingen din er lagt til
            <FaCheck className="inline ml-2" />
          </span>
        </div>
      )}
      {/* Popup for user to fill in review */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <RatingPopup onClose={handleClosePopup} onRatingSuccess={handleRatingSuccess} movieID={Number(movieID)} />
        </div>
      )}
    </div>
  );
}

export default MoviePage;
