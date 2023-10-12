import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Adventure', 'Biography', 'Drama', 'History', 'Action', 'Comedy', 'Crime', 'Documentary', 'Thriller'];

function MultipleSelectCheckmarks() {
  const [genre, setGenre] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof genre>) => {
    const {
      target: { value },
    } = event;
    setGenre(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl sx={{ m: 1, width: 220 }} className="bg-white rounded">
      <InputLabel id="genreLabel">Sjanger (kun demo)</InputLabel>
      <Select
        labelId="genreLabel"
        id="genre"
        multiple
        value={genre}
        onChange={handleChange}
        input={<OutlinedInput label="Sjanger (kun demo)" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={genre.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleSelectCheckmarks;
