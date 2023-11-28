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
        maxHeight: 400,
        borderRadius: '12px',
      },
    },
  };

  // Updates the selected sorts state when the user selects a new sort
  const handleSortChange = (event: SelectChangeEvent) => {
    setSelectedSort(event.target.value);
  };

  // Items used to genereate the dropdown menu and the corresponding query values
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
      id="sort-select"
      sx={{
        m: 1,
        width: smallScreen ? 106 : mediumScreen ? 185 : 155,
        borderRadius: '14px',
      }}
      className="bg-white"
    >
      <InputLabel
        aria-label="Sortering"
        htmlFor="sort-select"
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
        label="Sortering"
        value={selectedSort}
        onChange={handleSortChange}
        MenuProps={MenuProps}
        sx={{ borderRadius: '14px', fontSize: mediumScreen ? '0.9rem' : smallScreen ? '0.8rem' : '1rem' }}
      >
        <MenuItem value="">
          <em>Ingen</em>
        </MenuItem>
        {Object.entries(sortItems).map(([key, value]) => (
          <MenuItem key={key} className="italic" value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Sort;
