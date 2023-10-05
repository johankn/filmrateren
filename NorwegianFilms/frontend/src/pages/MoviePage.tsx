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
    <>
      <div className="w-screen h-screen bg-cover bg-redpurple grid gap-4 grid-cols-2">
        <div>
          <MovieCard movieID={movieID}></MovieCard>{" "}
          <div className="">
            <Button onClick={() => setShowPopup(!showPopup)}>
              Anmeld film
            </Button>
            {showPopup && <RatingPopup onClose={handleClosePopup} />}
          </div>
        </div>

        <div className="gap-2">
          {movie.userRatings.map((rating, index) => (
            <div>
              <RatingCard
                key={index}
                name={rating.name}
                rating={rating.rating}
                comment={rating.comment}
              />
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default MoviePage;
