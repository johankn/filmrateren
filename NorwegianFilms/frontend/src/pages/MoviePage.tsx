import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import RatingPopup from "../components/RatingPopup";
import Button from "@mui/joy/Button";
import { useState } from "react";
import RatingCard from "../components/RatingCard";
import movieFile from "../../../backend/src/movies.json";

function MoviePage() {
  const { movieID } = useParams<{ movieID: string }>();
  const [showPopup, setShowPopup] = useState(false);

  const movie = movieID
    ? movieFile.movies.find((m) => m.id === parseInt(movieID))
    : undefined;

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!movieID) {
    return <div>Movie ID is missing!</div>;
  }

  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
    <div
      className={`relative min-h-screen bg-cover bg-redpurple ${
        showPopup ? "blur-sm" : ""
      }`}
    >
      {/* MovieCard */}
      <div className="">
        <MovieCard movieID={movieID} />
      </div>

      {/* Rate filmen button */}
      <div className="ml-36">
        {!showPopup && (
          <Button onClick={() => setShowPopup(true)}>Rate filmen</Button>
        )}
      </div>

      {/* User Ratings */}
      <div className="p-10">
        <div className="font-bold text-large text-white mb-4">
          RATINGS ({movie.userRatings.length})
        </div>
        {movie.userRatings.map((rating, index) => (
          <div key={index} className="mt-4">
            <RatingCard
              name={rating.name}
              rating={rating.rating}
              comment={rating.comment}
            />
          </div>
        ))}
      </div>


    </div>      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <RatingPopup onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
}

export default MoviePage;
