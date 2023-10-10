import { useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import FormLabel from "@mui/joy/FormLabel";

type RatingPopupProps = {
  onClose: () => void;
};

function RatingPopup({ onClose }: RatingPopupProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: name,
      rating: rating,
      comment: comment,
    };

    console.log(data); 

    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      <div className="flex">

      <form onSubmit={handleSubmit} className="flex-grow">  
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <FormLabel className="color">Navnet ditt:</FormLabel>
          <Input
            size="md"
            placeholder="Eks: Ola Nordmann"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />{" "}
          <FormLabel>Vurdér filmen:</FormLabel>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                style={{
                  color: star <= (rating || 0) ? "gold" : "lightgrey",
                  fontSize: "4vw",
                }}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
          <FormLabel>Kommentarer til filmen:</FormLabel>
          <Textarea
            size="md"
            placeholder="Eks: En skummel, men spennende film!"
            minRows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <Button type="submit">Send inn</Button>
        </Stack>
      </form>
      <div className="ml-4">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-2 focus:outline-none"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
    </>
  );
}

export default RatingPopup;
