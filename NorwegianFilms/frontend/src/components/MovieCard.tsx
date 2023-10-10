import movieFile from "../../../backend/src/movies.json";

type MovieCardProps = {
  movieID: string;
};

function MovieCard({ movieID }: MovieCardProps) {
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
    (m) => m.id === Number(movieID),
  );

  if (!movie) return <p>Movie not found</p>;

  const fullStars = Math.floor(movie?.IMDBrating);

  const starArr =[];
  for (let i = 1; i <= fullStars; i++) {
    starArr.push(1);
  }


  const emptyStars = 5 - starArr.length;
  for (let i = 1; i <= emptyStars; i++) {
    starArr.push(0);
  }

  const stars = starArr.map((val, i) => (
    <div
      key={i}
      className="text-yellow-400"
      style={{
        fontSize: '24px',
        marginRight: '4px',
        color: 'yellow',
        display: 'inline-block',
      }}
    >
      ★
    </div>
  ));

  return (
    <div className="absolute left-20 right-20 grid grid-rows-auto-auto grid-cols-1fr-1fr gap-20 p-10 m-2 text-white italic">
      <div className="grid-row-1 grid-col-1-span-2 text-large">
        <h1>{movie.title}</h1>
      </div>

      <div className="flex flex-wrap w-2/5">
        <div className=" image md:w-1/2 md:pr-4 w-full">
          <p>Insert picture here</p>
        </div>

        <div className="info md:w-1/2 md:pl-4 w-full ">
          <div className="mb-6">
            <p>Sjanger: {movie.genre}</p>
            <p>Regi: {movie.director}</p>
          </div>
          <div className="rating">
            <p>IMDB rating: {movie.IMDBrating}</p>
            <div className="flex">
              {stars}
            </div>
          </div>
        </div>


      </div>

      
      
    </div>
  );
}

export default MovieCard;