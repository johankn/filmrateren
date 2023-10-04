import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function MoviePage() {
  const { movieID } = useParams<{ movieID: string }>();

  if (!movieID) {
    return <div>Movie ID is missing!</div>;
  }


    return (<>
    <div className="w-screen h-screen bg-cover bg-redpurple">
    <MovieCard movieID={movieID}></MovieCard></div>
    </>
    )
}

export default MoviePage;