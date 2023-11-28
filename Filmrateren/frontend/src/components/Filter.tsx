import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedGenresState, selectedProvidersState, selectedTitleState } from '../atoms';
import { GET_AVAILABLE_FILTERS_QUERY } from '../queries/SearchQueries';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

interface FilterProps {
  smallScreen: boolean;
  mediumScreen: boolean;
  filterType: string;
}

function Filter(props: FilterProps) {
  // Props to set the styling of the dropdown menu
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 400,
        maxWidth: 230,
        borderRadius: '12px',
      },
    },
  };

  const selectedTitle = useRecoilValue(selectedTitleState);

  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);

  const [getAvailableFilters, { data: filtersData, loading: filtersLoading, error: filtersError }] =
    useLazyQuery(GET_AVAILABLE_FILTERS_QUERY);

  if (filtersError) {
    console.error('Error fetching movies:', filtersError.message);
  }
  // Items shown in the dropdown menu based on the filterType prop
  const names =
    props.filterType == 'genres'
      ? [
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
        ]
      : [
          'Amazon Prime Video',
          'Apple TV',
          'Disney +',
          'Google Play Movies',
          'HBO',
          'HBO Max',
          'Netflix',
          'SF Anytime',
          'Strim',
          'TV 2 Play',
          'Viaplay',
        ];

  const label = props.filterType == 'genres' ? 'Sjanger' : 'Streaming';

  const [selectedGenres, setSelectedGenres] = useRecoilState(selectedGenresState);
  const [selectedProviders, setSelectedProviders] = useRecoilState(selectedProvidersState);

  // Update the selectedGenres and selectedProviders states when the user selects or deselects an item
  const handleChange =
    props.filterType == 'genres'
      ? (event: SelectChangeEvent<typeof selectedGenres>) => {
          const {
            target: { value },
          } = event;
          setSelectedGenres(typeof value === 'string' ? value.split(',') : value);
        }
      : (event: SelectChangeEvent<typeof selectedProviders>) => {
          const {
            target: { value },
          } = event;
          setSelectedProviders(typeof value === 'string' ? value.split(',') : value);
        };

  // Get the available genres and providers based on the selected title, genres and providers
  const handleOpen = () => {
    if (selectedTitle != '' || selectedGenres.length > 0 || selectedProviders.length > 0) {
      getAvailableFilters({
        variables: {
          title: selectedTitle,
          genres: selectedGenres,
          providers: selectedProviders,
        },
      });
    }
  };

  // Update the available genres and providers when the query is returned and filtersData changes
  useEffect(() => {
    setAvailableGenres(filtersData?.getAvailableFilters?.availableGenres || []);
    setAvailableProviders(filtersData?.getAvailableFilters?.availableProviders || []);
  }, [filtersData]);

  return (
    <FormControl
      id="filter"
      sx={{
        m: 1,
        width: props.smallScreen ? 106 : props.mediumScreen ? 185 : 155,
        borderRadius: '14px',
      }}
      className="bg-white rounded"
    >
      <InputLabel
        htmlFor="filter"
        id="filterLabel"
        sx={{
          fontSize: props.mediumScreen ? '0.9rem' : props.smallScreen ? '0.8rem' : '1rem',
          borderRadius: '14px',
          overflow: 'visible',
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="filterLabel"
        multiple
        label={label}
        value={props.filterType == 'genres' ? selectedGenres : selectedProviders}
        onChange={handleChange}
        onOpen={handleOpen}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        sx={{ borderRadius: '14px', fontSize: props.mediumScreen ? '0.9rem' : props.smallScreen ? '0.8rem' : '1rem' }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            // Disable the item if the item is not in available genres or providers
            disabled={
              props.filterType == 'genres'
                ? (!(selectedTitle == '' && selectedProviders.length == 0) && !availableGenres.includes(name)) ||
                  filtersLoading
                : (!(selectedTitle == '' && selectedGenres.length == 0) && !availableProviders.includes(name)) ||
                  filtersLoading
            }
          >
            <Checkbox
              checked={
                props.filterType == 'genres' ? selectedGenres.indexOf(name) > -1 : selectedProviders.indexOf(name) > -1
              }
            />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Filter;
