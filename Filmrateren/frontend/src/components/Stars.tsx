type StarProps = {
  rating: number;
};

const Stars: React.FC<StarProps> = ({ rating }) => {
  // Show rating as filled and empty stars
  const filledStars = Math.round(rating);

  const emptyStars = 5 - filledStars;

  return (
    <div className="stars">
      {[...Array(filledStars)].map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`}>☆</span>
      ))}
    </div>
  );
};

export default Stars;
