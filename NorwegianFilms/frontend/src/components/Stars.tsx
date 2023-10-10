type StarProps = {
  rating: number;
}

const Stars: React.FC<StarProps> = ({ rating }) => {

    // Determine the number of stars based on rounding
    const roundedStars = Math.round(rating);

    // Determine the number of empty stars
    const emptyStars = 5 - roundedStars;

    return (
        <div>
            {[...Array(roundedStars)].map((_, i) => <span key={`full-${i}`}>★</span>)}
            {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`}>☆</span>)}
        </div>
    )
}

export default Stars;
