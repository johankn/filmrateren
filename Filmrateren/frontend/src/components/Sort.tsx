import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { selectedSortState } from '../atoms';

function Sort({ smallScreen, mediumScreen }: { smallScreen: boolean; mediumScreen: boolean }) {
  const [selectedSort, setSelectedSort] = useRecoilState(selectedSortState);
  const MenuProps = {
    PaperProps: {
      style: {
        borderRadius: '12px',
      },
    },
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSelectedSort(event.target.value);
  };

  const sortItems = {
    POPULARITY_DESC: 'Popularitet',
    ALPHABETICAL_ASC: 'Alfabetisk A-Å',
    ALPHABETICAL_DESC: 'Alfabetisk Å-A',
    IMDB_DESC: 'Rating IMDB synkende',
    IMDB_ASC: 'Rating IMDB stigende',
    RELEASEYEAR_DESC: 'Nyest utgivelsesår',
    RELEASEYEAR_ASC: 'Eldst utgivelsesår',
    RUNTIME_DESC: 'Lengst varighet',
    RUNTIME_ASC: 'Kortest varighet',
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: smallScreen ? 106 : mediumScreen ? 185 : 155,
        borderRadius: '14px',
      }}
      className="bg-white"
    >
      <InputLabel
        id="sort-select-label"
        sx={{
          fontSize: mediumScreen ? '0.9rem' : smallScreen ? '0.8rem' : '1rem',
          borderRadius: '14px',
          overflow: 'visible',
        }}
      >
        Sortering
      </InputLabel>
      <Select
        className=""
        labelId="sort-select-label"
        id="sort-select"
        label="Sortering"
        value={selectedSort}
        onChange={handleSortChange}
        MenuProps={MenuProps}
        sx={{ borderRadius: '14px', fontSize: mediumScreen ? '0.9rem' : smallScreen ? '0.8rem' : '1rem' }}
      >
        <MenuItem value="">
          <em>Ingen</em>
        </MenuItem>
        <MenuItem className="italic" value="POPULARITY_DESC">
          Popularitet
        </MenuItem>
        <MenuItem className="italic" value="ALPHABETICAL_ASC">
          Alfabetisk A-Å
        </MenuItem>
        <MenuItem className="italic" value="ALPHABETICAL_DESC">
          Alfabetisk Å-A
        </MenuItem>
        <MenuItem className="italic" value="IMDB_DESC">
          Rating IMDB synkende
        </MenuItem>
        <MenuItem className="italic" value="IMDB_ASC">
          Rating IMDB stigende
        </MenuItem>
        <MenuItem className="italic" value="RELEASEYEAR_DESC">
          Nyest utgivelsesår
        </MenuItem>
        <MenuItem className="italic" value="RELEASEYEAR_ASC">
          Eldst utgivelsesår
        </MenuItem>
        <MenuItem className="italic" value="RUNTIME_DESC">
          Lengst varighet
        </MenuItem>
        <MenuItem className="italic" value="RUNTIME_ASC">
          Kortest varighet
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default Sort;
