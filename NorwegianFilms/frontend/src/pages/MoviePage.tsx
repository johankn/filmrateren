import { useNavigate, useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useState } from 'react';
import RatingCard from '../components/RatingCard';
import movieFile from '../../../backend/src/movies.json';
import ScrollToTop from '../components/ScrollToTop';
import RatingPopup from '../components/RatingPopup';

function MoviePage() {
  const { movieID } = useParams<{ movieID: string }>();
  const [showPopup, setShowPopup] = useState(false);

  const movie = movieID ? movieFile.movies.find((m) => m.id === parseInt(movieID)) : undefined;

  const navigate = useNavigate();

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!movieID) {
    return <div>Movie ID is missing!</div>;
  }

  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <div className={`relative min-h-screen bg-cover bg-redpurple ${showPopup ? 'blur-sm' : ''}`}>
        <ScrollToTop />
        <div className="pl-10 pt-5 absolute w-full">
          <button onClick={() => navigate(-1)}>
            <span className="custom-arrow-icon text-white text-xl">←</span>
          </button>
        </div>
        <div className="container mx-auto grid grid-cols-1fr 2fr 1fr">
          <div className="col-start-2">
            <MovieCard movieID={movieID} />
          </div>
        </div>
        <div className="flex mx-auto w-2/5 ">
          {!showPopup && <button className=" rounded-md w-36 h-12 text-white text-base border-2 border-yellow hover:scale-110 hover:bg-darkpurple" onClick={() => setShowPopup(true)}>RATE FILMEN</button>}
        </div>
        <div className="p-10">
          <div className="font-bold text-large text-white mb-4 mx-auto w-3/5">RATINGS ({movie.userRatings.length})</div>
          {movie.userRatings.map((rating, index) => (
            <div key={index} className="mt-4">
              <RatingCard name={rating.name} rating={rating.rating} comment={rating.comment} />
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          {/* Render the popup component here */}
          <RatingPopup onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
}

export default MoviePage;
