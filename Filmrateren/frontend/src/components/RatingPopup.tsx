import { useState } from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import FormLabel from '@mui/joy/FormLabel';
import { FormHelperText } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_RATING_TO_MOVIE } from '../queries/AddRatingMutation';

type RatingPopupProps = {
  onClose: () => void;
  movieID: number;
};

function RatingPopup({ onClose, movieID }: RatingPopupProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const [showRatingError, setRatingError] = useState(false);
  const [showNameError, setNameError] = useState(false);
  const [showCommentError, setCommentError] = useState(false);

  const [addRatingToMovie] = useMutation(ADD_RATING_TO_MOVIE);

  const nameIsValid = !(/^\s+$/.test(name)) && name; // Check if name contains other characters than whitespace
  const commentIsValid = !(/^\s+$/.test(comment)) && comment; // Check if comment contains  other characters than whitespace
  const ratingIsValid = (rating !== null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (movieID && ratingIsValid && nameIsValid && commentIsValid) {

      const variables = {
        movieId: movieID,
        rating: {
          name: name,
          rating: rating,
          comment: comment,
        },
      };

      

      addRatingToMovie({ variables })
        .then((response) => {
          console.log('Rating added successfully', response.data.addRatingToMovie);
        })
        .catch((error) => {
          console.error('Error adding rating', error);
        });

      if (onClose) {
        onClose();
      }
    }
    else {
        console.error('Incomplete data. Please fill in all fields.');
        if (!nameIsValid) {setNameError(true)} else setNameError(false)
        if (!ratingIsValid) {setRatingError(true)} else setRatingError(false)
        if (!commentIsValid) {setCommentError(true)} else setCommentError(false)
    }
  };

  return (
    <div className="rating-popup grid bg-darkblue bg-opacity-80 rounded-xl p-3 pl-10 pr-10 pb-5">
      <div className="ml-auto">
        <button
          className=" text-white hover:text-gold rounded-full p-2 focus:outline-none transition-transform transform hover:scale-125"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex-grow">
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <FormLabel style={{ color: 'white', fontSize: 'large' }}>Navn</FormLabel>
          <Input
            size="md"
            placeholder="Eks: Ola Nordmann"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={showNameError}
          />
          {(showNameError) && (
            <FormHelperText style={{ color: 'red', fontWeight: 'bold', fontSize: 'medium' }}>
              Skriv inn navnet ditt
            </FormHelperText>
          )}
          <FormLabel style={{ color: 'white', fontSize: 'large' }}>Gi din anmeldelse</FormLabel>
          <section>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                style={{
                  color: star <= (rating || 0) ? 'gold' : 'lightgrey',
                  fontSize: '4vw',
                }}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </section>
          {(showRatingError) && (
            <FormHelperText style={{ color: 'red', fontWeight: 'bold', fontSize: 'medium' }}>
              Klikk på en stjerne for å velge rating
            </FormHelperText>
          )}
          <FormLabel style={{ color: 'white', fontSize: 'large'}}>Kommentarer</FormLabel>
          <Textarea
            size="md"
            placeholder="Eks: En skummel, men spennende film!"
            minRows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            error={showCommentError}
          />
          {(showCommentError) && (
            <FormHelperText style={{ color: 'red', fontWeight: 'bold', fontSize: 'medium' }}>
              Skriv inn en kommentar til ratingen
            </FormHelperText>
          )}
          <button 
            className="ml-5 rounded-lg w-16 h-8 sm:w-16 sm:h-12 md:w-44 md:h-14 text-white text-small sm:text-base md:text-lg border-2 border-yellow hover:scale-110 hover:bg-darkpurple" 
            type="submit"
            >
            Send inn
          </button>
        </Stack>
      </form>
    </div>
  );
}

export default RatingPopup;
