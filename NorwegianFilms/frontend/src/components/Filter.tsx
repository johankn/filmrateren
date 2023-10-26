import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useRecoilState } from 'recoil';
import { selectedGenresState } from '../atoms';

interface FilterProps {
  smallScreen: boolean;
  mediumScreen: boolean;
}

function MultipleSelectCheckmarks(props: FilterProps) {
  const ITEM_HEIGHT = 80;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  const names = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'TV Movie',
    'Thriller',
    'War',
    'Western',
  ];

  const [selectedGenres, setSelectedGenres] = useRecoilState(selectedGenresState);

  const handleChange = (event: SelectChangeEvent<typeof selectedGenres>) => {
    const {
      target: { value },
    } = event;
    setSelectedGenres(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl
      sx={{ m: 1, width: props.smallScreen ? 143 : props.mediumScreen ? 278 : 200 }}
      className="bg-white rounded"
    >
      <InputLabel
        id="genreLabel"
        sx={{
          fontSize: props.mediumScreen ? '0.8rem' : '1rem',
          lineHeight: props.mediumScreen ? '0.9rem' : '1.4375rem',
        }}
      >
        Sjanger
      </InputLabel>
      <Select
        labelId="genreLabel"
        id="genre"
        multiple
        value={selectedGenres}
        onChange={handleChange}
        input={<OutlinedInput label="Sjanger (kun demo)" margin="dense" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        sx={{ fontSize: props.mediumScreen ? '0.5rem' : '1rem' }}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selectedGenres.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleSelectCheckmarks;
