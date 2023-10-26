import { useNavigate, useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import RatingPopup from '../components/RatingPopup';
import { useState } from 'react';
import RatingCard from '../components/RatingCard';
import movieFile from '../../../backend/src/norwegian_movies.json';
import ScrollToTop from '../components/ScrollToTop';

function MoviePage() {
  const { movieID } = useParams<{ movieID: string }>();
  const [showPopup, setShowPopup] = useState(false);

  const movie = movieID ? movieFile.movies.find((m) => m.id === parseInt(movieID)) : undefined;

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const navigate = useNavigate();

  if (!movieID) {
    return <div>Movie ID is missing!</div>;
  }

  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <div className={`relative min-h-screen ${showPopup ? 'blur-sm' : ''}`}>
        <ScrollToTop />
        <div className="fixed top-0 left-0 p-4">
          <button className="hover:scale-125" onClick={() => navigate(-1)}>
            <span className="custom-arrow-icon text-white text-large sm:text-large md:text-xl lg:text-twoxl ">←</span>
          </button>
        </div>
        <div className="pt-7">
          <MovieCard movieID={movieID} />
        </div>
        <div className="flex mx-auto w-2/6">
          {!showPopup && <button className=" rounded-md w-36 h-12 text-white text-base border-2 border-yellow hover:scale-110 hover:bg-darkpurple" onClick={() => setShowPopup(true)}>Rate filmen</button>}</div>
        <div className="p-10">
          <div className="font-bold text-white mb-4 mx-auto w-4/6 sm:text-base md:text-base lg:text-large">RATINGS ({movie.userRatings.length})</div>
          {movie.userRatings.map((rating, index) => (
            <div key={index} className="mt-4">
              <RatingCard name={rating.name} rating={rating.rating} comment={rating.comment} />
            </div>
          ))}
        </div>
      </div>{' '}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <RatingPopup onClose={handleClosePopup} movieID={Number(movieID)} />
        </div>
      )}
    </div>
  );
}

export default MoviePage;
