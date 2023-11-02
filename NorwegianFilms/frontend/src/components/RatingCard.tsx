type RatingProps = {
  name: string;
  rating: number;
  comment: string;
};

const RatingCard: React.FC<RatingProps> = ({name, rating, comment }) => {
  return (
    <div className=" shadow-md rounded-md space-y-2 pb-4 w-full">
      <h4 className="md:text-base text-small text-white font-bold">{name}</h4>
      <div className="flex justify-start space-x-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`md:text-2xl text:medium ${i < rating ? 'text-yellow' : 'text-lightgrey'}`}>
            ★
          </span>
        ))}
      </div>
      <p className="mt-2 text-white md:text-base text-md italic">{comment}</p>
    </div>
  );
};

export default RatingCard;
