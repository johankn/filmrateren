import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { selectedSortState } from '../atoms';

function Sort({ smallScreen, mediumScreen }: { smallScreen: boolean; mediumScreen: boolean }) {
  const [selectedSort, setSelectedSort] = useRecoilState(selectedSortState);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSelectedSort(event.target.value);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: smallScreen ? 143 : mediumScreen ? 278 : 200,
        minHeight: 10,
      }}
      className="bg-white rounded"
    >
      <InputLabel
        id="sort-select-label"
        sx={{ fontSize: mediumScreen ? '0.8rem' : '1rem', lineHeight: mediumScreen ? '0.9rem' : '1.4375rem' }}
      >
        Sortering
      </InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        label="Sortering"
        value={selectedSort}
        onChange={handleSortChange}
        inputProps={{
          sx: {
            padding: mediumScreen ? '13.5px' : undefined, // Adjust the padding value as needed
          },
        }}
        sx={{ fontSize: mediumScreen ? '0.8rem' : '1rem' }}
      >
        <MenuItem value="">
          <em>Ingen</em>
        </MenuItem>
        <MenuItem value="ALPHABETICAL_ASC">Alfabetisk A-Å</MenuItem>
        <MenuItem value="ALPHABETICAL_DESC">Alfabetisk Å-A</MenuItem>
        <MenuItem value="IMDB_DESC">Rating IMDB synkende</MenuItem>
        <MenuItem value="IMDB_ASC">Rating IMDB stigende</MenuItem>
        <MenuItem value="RELEASEYEAR_DESC">Nyest utgivelsesår</MenuItem>
        <MenuItem value="RELEASEYEAR_ASC">Eldst utgivelsesår</MenuItem>
        <MenuItem value="RUNTIME_DESC">Lengst varighet</MenuItem>
        <MenuItem value="RUNTIME_ASC">Kortest varighet</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Sort;
