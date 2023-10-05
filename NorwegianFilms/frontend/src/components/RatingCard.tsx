
type RatingProps = {
  name: string;
  rating: number;
  comment: string;
};

const RatingCard: React.FC<RatingProps> = ({ name, rating, comment }) => {
  return (
    <div className="rating-card">
      <h4>{name}</h4>
      <div>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? 'gold' : 'gray' }}>
            ★
          </span>
        ))}
      </div>
      <p>{comment}</p>
    </div>
  );
};

export default RatingCard;
