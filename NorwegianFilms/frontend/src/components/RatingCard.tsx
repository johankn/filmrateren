import { useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import FormLabel from "@mui/joy/FormLabel";

function RatingCard() {
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          alert(JSON.stringify(formJson));
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <FormLabel>Navnet ditt</FormLabel>
          <Input size="md" placeholder="Name..." required />
          <FormLabel>Kommentarer til filmen</FormLabel>
          <Textarea
            size="md"
            placeholder="General comments..."
            minRows={4}
            required
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </>
  );
}

export default RatingCard;
