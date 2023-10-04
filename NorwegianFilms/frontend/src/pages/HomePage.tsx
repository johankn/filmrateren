import Autocomplete from "@mui/joy/Autocomplete";
import Input from "@mui/joy/Input";
import movieFile from "../../../backend/src/movies.json";
import { useNavigate } from "react-router-dom";
import RatingCard from "../components/RatingCard";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* <Autocomplete
        options={movieFile.movies}
        getOptionLabel={(option) => option.title}
        onChange={(_event, newValue) => {
          if (newValue) {
            navigate(`/project2/moviePage/${newValue.id}`);
          }
        }}
      /> */}
      <RatingCard />
    </>
  );
}

export default HomePage;
