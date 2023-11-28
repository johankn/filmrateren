type RatingProps = {
  name: string;
  rating: number;
  comment: string;
};

const RatingCard: React.FC<RatingProps> = ({ name, rating, comment }) => {
  return (
    <div className="rating-card shadow-2xl rounded-2xl space-y-2 p-3 pb-5 w-full bg-black bg-opacity-15 bg-blend-lighten">
      <div className="relative z-10">
        {/* Name of person rating */}
        <h2 className=" ml-4 pt-2 sm:text-base md:text-medium text-small text-white font-bold">{name}</h2>
        {/* Rating as stars */}
        <figure className="ml-4 flex justify-start space-x-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`sm:text-base md:text-2xl text:medium ${i < rating ? 'text-yellow' : 'text-lightgrey'}`}
            >
              ★
            </span>
          ))}
        </figure>
        {/* Rating comment */}
        <h3 className="mt-2 ml-4 text-white sm:text-base md:text-base text-md italic">{comment}</h3>
      </div>
    </div>
  );
};

export default RatingCard;
