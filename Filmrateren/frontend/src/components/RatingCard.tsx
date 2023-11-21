type RatingProps = {
  name: string;
  rating: number;
  comment: string;
};

const RatingCard: React.FC<RatingProps> = ({ name, rating, comment }) => {
  return (
    <div className="rating-card shadow-lg rounded-md space-y-2 pb-4 w-full">
      <h4 className=" ml-4 pt-2 sm:text-base md:text-medium text-small text-white font-bold">{name}</h4>
      <figure className="ml-4 flex justify-start space-x-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`sm:text-base md:text-2xl text:medium ${i < rating ? 'text-yellow' : 'text-lightgrey'}`}>
            ★
          </span>
        ))}
      </figure>
      <p className="mt-2 ml-4 text-white sm:text-base md:text-medium text-md italic">{comment}</p>
    </div>
  );
};

export default RatingCard;
