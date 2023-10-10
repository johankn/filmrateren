// function SearchHitCard() {
//   return (
//     <div className="columns-1 ">
//       <div
//         style={{
//           height: "20rem",
//           width: "15rem",
//           backgroundColor: "rgb(54, 54, 54)",
//           borderRadius: "1rem",
//         }}
//       ></div>
//       <div>Tittel</div>
//     </div>
//   );
// }
//
// export default SearchHitCard;

import movieFile from "../../../backend/src/movies.json";
import "./SearchHitCard.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type SearchHitCardProps = {
  movieID: string;
};

function SearchHitCard({ movieID }: SearchHitCardProps) {
  type Movie = {
    id: number;
    title: string;
    director: string;
    releaseYear: number;
    genre: string;
    IMDBrating: number;
    posterUrl: string;
    userRatings: {
      name: string;
      rating: number;
      comment: string;
    }[];
  };

  const movie: Movie | undefined = movieFile.movies.find(
    (m) => m.id === Number(movieID)
  );

  if (!movie) return <p>Movie not found</p>;

  // Create a ref for the h1 element
  const h1Ref = useRef<HTMLHeadingElement>(null);

  // State to track whether the title overflows
  const [titleOverflow, setTitleOverflow] = useState(false);

  // Function to check if the title overflows
  const checkTitleOverflow = () => {
    if (h1Ref.current) {
      const isOverflowing =
        h1Ref.current.scrollWidth > h1Ref.current.clientWidth;
      setTitleOverflow(isOverflowing);
    }
  };

  // Use useEffect to check for title overflow on component mount and when the movie changes
  useEffect(() => {
    checkTitleOverflow();
  }, [movie]);

  return (
    <div
      className="text-white italic flex flex-col justify-center items-center"
      style={{
        height: "20rem",
        width: "13rem",
      }}
    >
      <Link to={`/project2/moviePage/${movieID}`}>
        <h1
          ref={h1Ref} // Assign the ref to the h1 element
          className={`text-center ${
            titleOverflow ? "text-small" : ""
          } truncate`}
        >
          {movie.title}
        </h1>
        <div className="flex justify-center items-center h-full">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            style={{
              height: "17.8rem",
              maxWidth: "100%",
              borderRadius: "1rem",
            }}
            className="max-h-full max-w-full"
          />
        </div>
      </Link>
    </div>
  );
}

export default SearchHitCard;
