import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Sort({ selectedSort, setSelectedSort }) {
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 220 }} className="bg-white rounded">
      <InputLabel id="sort-select-label">Sortering</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        label="Sortering"
        value={selectedSort}
        onChange={handleSortChange}
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
