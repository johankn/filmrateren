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
      <div 
        className={`relative min-h-screen bg-cover bg-redpurple overflow-auto ${showPopup ? 'blur-sm' : ''}`}
      >
        <div className="grid grid-cols-3 gap-4 p-4">
  
          <div className="col-span-2">
            <MovieCard movieID={movieID}></MovieCard>
          </div>
  
          <div className="mt-28">
            {!showPopup && 
              <Button onClick= {()=> setShowPopup(true)}>Rate filmen</Button>
            }
          </div>
  
          <div className="col-span-3">
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
        </div>
  

      </div>
      {showPopup && 
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <RatingPopup onClose={handleClosePopup} />
          </div>
        }
    </>
  );
  
  
  
}

export default MoviePage;
