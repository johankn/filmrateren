import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import RatingPopup from "../components/RatingPopup";
import Button from "@mui/joy/Button";
import { useState } from "react";

function MoviePage() {
  const { movieID } = useParams<{ movieID: string }>();
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  if (!movieID) {
    return <div>Movie ID is missing!</div>;
  }


    return (<>
    <div className="w-screen h-screen bg-cover bg-redpurple">
    <MovieCard movieID={movieID}></MovieCard>
    <Button onClick={() => setShowPopup(!showPopup)}>Rate this movie</Button>
    {showPopup && <RatingPopup onClose={handleClosePopup} />}
</div>
    </>
    )
}

export default MoviePage;