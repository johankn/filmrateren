type StarProps = {
  rating: number;
};

const Stars: React.FC<StarProps> = ({ rating }) => {
  const roundedStars = Math.round(rating);

  const emptyStars = 5 - roundedStars;

  return (
    <div>
      {[...Array(roundedStars)].map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`}>☆</span>
      ))}
    </div>
  );
};

export default Stars;
