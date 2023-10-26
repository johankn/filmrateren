type RatingProps = {
  name: string;
  rating: number;
  comment: string;
};

const RatingCard: React.FC<RatingProps> = ({name, rating, comment }) => {
  return (
    <div className="rating-card p-4 shadow-md rounded-md space-y-2 mx-auto w-3/5">
      <h4 className="text-lg text-white font-bold">{name}</h4>
      <div className="flex justify-start space-x-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-2xl ${i < rating ? 'text-yellow' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
      <p className="mt-2 text-white italic">{comment}</p>
    </div>
  );
};

export default RatingCard;
