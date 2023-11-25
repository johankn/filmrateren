import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedGenresState, selectedTitleState } from '../atoms';
import { GET_AVAILABLE_GENRES_QUERY } from '../queries/SearchQueries';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

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

  const selectedTitle = useRecoilValue(selectedTitleState);

  const [availableGenres, setAvailableGenres] = useState<string[]>([]);

  const [getAvailableGenres, { data: genresData, loading: genresLoading, error: genresError }] =
    useLazyQuery(GET_AVAILABLE_GENRES_QUERY);

  if (genresError) {
    console.error('Error fetching movies:', genresError.message);
  }

  const names = [
    'Action',
    'Animasjon',
    'Dokumentar',
    'Drama',
    'Eventyr',
    'Familie',
    'Fantasy',
    'Historie',
    'Komedie',
    'Krig',
    'Krim',
    'Musikk',
    'Mysterium',
    'Romanse',
    'Science Fiction',
    'Skrekk',
    'TV-Film',
    'Thriller',
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

  const handleOpen = () => {
    getAvailableGenres({
      variables: {
        title: selectedTitle,
        genresSelected: selectedGenres,
      },
    });
  };

  useEffect(() => {
    setAvailableGenres(genresData?.getAvailableGenres?.genres || []);
  }, [genresData]);

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
        onOpen={handleOpen}
        input={
          <OutlinedInput
            label="Sjanger"
            margin="dense"
            inputProps={{
              sx: {
                padding: props.mediumScreen ? '13.5px' : undefined, // Adjust the padding value as needed
              },
            }}
          />
        }
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        sx={{ fontSize: props.mediumScreen ? '0.8rem' : '1rem' }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            disabled={(selectedTitle != '' && !availableGenres.includes(name)) || genresLoading}
          >
            <Checkbox checked={selectedGenres.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleSelectCheckmarks;
