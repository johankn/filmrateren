import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { selectedSortState } from '../atoms';

function Sort({ smallScreen, mediumScreen }) {
  const [selectedSort, setSelectedSort] = useRecoilState(selectedSortState);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSelectedSort(event.target.value);
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: smallScreen ? 143 : mediumScreen ? 278 : 200, minHeight: 10 }}
      className="bg-white rounded"
    >
      <InputLabel
        id="sort-select-label"
        sx={{ fontSize: mediumScreen ? '0.8rem' : '1rem', lineHeight: mediumScreen ? '.9rem' : '01.4375rem' }}
      >
        Sortering
      </InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        label="Sortering"
        value={selectedSort}
        onChange={handleSortChange}
        sx={{ fontSize: mediumScreen ? '0.5rem' : '1rem' }}
      >
        <MenuItem value="">
          <em>Ingen</em>
        </MenuItem>
        <MenuItem value={10}>Alfabetisk A-Å</MenuItem>
        <MenuItem value={20}>Alfabetisk Å-A</MenuItem>
        <MenuItem value={30}>Rating IMDB synkende</MenuItem>
        <MenuItem value={40}>Rating IMDB stigende</MenuItem>
        <MenuItem value={50}>Rating brukere synkende</MenuItem>
        <MenuItem value={60}>Rating brukere stigende</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Sort;
