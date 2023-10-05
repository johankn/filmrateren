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
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: name,
      comment: comment,
    };

    console.log(data); // This logs the input data as a JSON dictionary

    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <FormLabel>Navnet ditt</FormLabel>
          <Input
            size="md"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormLabel>Kommentarer til filmen</FormLabel>
          <Textarea
            size="md"
            placeholder="General comments..."
            minRows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </>
  );
}

export default RatingPopup;
