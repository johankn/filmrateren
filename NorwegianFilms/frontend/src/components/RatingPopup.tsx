import React, { useState } from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import FormLabel from '@mui/joy/FormLabel';
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

  const [addRatingToMovie] = useMutation(ADD_RATING_TO_MOVIE);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (movieID && name && rating !== null && comment) {
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
    } else {
      console.error('Incomplete data. Please fill in all fields.');
    }
  };
  

  return (
    <>
      <div className="grid bg-darkblue bg-opacity-80 rounded-xl p-3 pl-10 pr-10 pb-5">
        <div className="ml-auto">
          <button
            className=" text-white hover:text-gold rounded-full p-2 focus:outline-none transition-transform transform hover:scale-125"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="formen">
          <form onSubmit={handleSubmit} className="flex-grow">
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
              <FormLabel style={{ color: 'white', fontSize: 'large' }}>Navn</FormLabel>
              <Input
                size="md"
                placeholder="Eks: Ola Nordmann"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormLabel style={{ color: 'white', fontSize: 'large' }}>Gi din anmeldelse</FormLabel>
              <div>
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
              </div>
              <FormLabel style={{ color: 'white', fontSize: 'large' }}>Kommentarer</FormLabel>
              <Textarea
                size="md"
                placeholder="Eks: En skummel, men spennende film!"
                minRows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <Button style={{ fontSize: 'base' }} type="submit">
                Send inn
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
}

export default RatingPopup;
