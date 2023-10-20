import { useState, useEffect } from 'react';
import screen from '../assets/screenContent.svg';
import mobileScreen from '../assets/mobile_screen.svg';
import seats from '../assets/seats.png';
import mobileSeats from '../assets/mobile_seats.png';
import logo from '../assets/film_rateren.svg';
import Autocomplete from '@mui/joy/Autocomplete';
import movieFile from '../../../backend/src/norwegian_movies.json';
import { useNavigate } from 'react-router-dom';
import SearchHitCard from '../components/SearchHitCard';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedSortState,
  scrollPositionState,
  selectedGenresState,
  inputValueState,
  cardsToShowState,
} from '../atoms';
import { useQuery } from '@apollo/client';
import { SEARCH_MOVIES_QUERY } from '../queries/SearchQueries';
import { getHomePageStyles } from './HomePageDynamicStyles';

function HomePage() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useRecoilState(scrollPositionState);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const selectedGenres = useRecoilValue(selectedGenresState);
  const selectedSort = useRecoilValue(selectedSortState);

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useRecoilState(inputValueState);
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  const {
    opacitySearch,
    opacityScreenImg,
    homePageStyle,
    screenStyle,
    searchBarWrapperStyle,
    filterStyle,
    sortStyle,
    btnStyle,
    seatsStyle,
    searchStyle,
    screenContentStyle,
    logoStyle,
  } = getHomePageStyles(windowSize, scrollPosition);

  useEffect(() => {
    // Setup a debouncer for 1500ms
    const debouncer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1500);

    // Cleanup the debouncer
    return () => {
      clearTimeout(debouncer);
    };
  }, [inputValue]);

  const { data, loading, error } = useQuery(SEARCH_MOVIES_QUERY, {
    variables: { title: debouncedValue },
    skip: !debouncedValue, // Skip the query if debouncedValue is empty
  });

  const movies = data?.movies || [];

  console.log('Movies:', movies);

  const cardsToLoad = 28; // Number of cards to load when clicking "Load More"
  const [cardsToShow, setCardsToShow] = useRecoilState(cardsToShowState);

  const [filteredMovies, setFilteredMovies] = useState(movieFile.movies);

  // Function to load more cards
  const loadMoreCards = () => {
    setCardsToShow(cardsToShow + cardsToLoad);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogoClick = () => {
    if (opacitySearch > 0) {
      scrollToTop();
    }
  };

  const handleSearchClick = () => {
    console.log('Selected Sort:', selectedSort);

    const selectedGenresSet = new Set(selectedGenres);
    let filtered = movieFile.movies.filter((movie) => {
      if (selectedGenresSet.size === 0) {
        // If no genres are selected, show all movies
        return true;
      }

      const movieGenres = movie.genres;

      for (const selectedGenre of selectedGenresSet) {
        if (movieGenres.includes(selectedGenre)) {
          // If any selected genre is present, show the movie
          return true;
        }
      }

      // If none of the selected genres match, skip the movie
      return false;
    });

    if (selectedSort == '10') {
      // Sort by title in ascending order
      filtered = filtered.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    } else if (selectedSort == '20') {
      // Sort by title in descending order
      filtered = filtered.sort((a, b) => {
        if (a.title < b.title) return 1;
        if (a.title > b.title) return -1;
        return 0;
      });
    } else if (selectedSort == '30') {
      // Sort by title in ascending order
      filtered = filtered.sort((a, b) => {
        if (a.IMDBrating < b.IMDBrating) return 1;
        if (a.IMDBrating > b.IMDBrating) return -1;
        return 0;
      });
    } else if (selectedSort == '40') {
      // Sort by title in ascending order
      filtered = filtered.sort((a, b) => {
        if (a.IMDBrating < b.IMDBrating) return -1;
        if (a.IMDBrating > b.IMDBrating) return 1;
        return 0;
      });
    }

    setFilteredMovies(filtered);
  };

  useEffect(() => {
    // Search every time HomePage renders in order to load the right movies for the saved user choices
    handleSearchClick();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  };

  return (
    <div
      className="m-0 flex flex-col justify-start items-center w-full min-h-[150vh] overflow-x-hidden gap-16"
      style={homePageStyle}
    >
      <div className="fixed top-0 left-0 mt-8 ml-8 w-16 h-auto z-9998" onClick={handleLogoClick}>
        <img src={logo} alt="logo" className="cursor-pointer" style={logoStyle} />
      </div>
      <div
        className="bg-[rgba(255,247,238,0.9)] rounded-[0.3rem] flex flex-col justify-start items-center relative"
        style={screenStyle}
      >
        <div className="absolute flex flex-row justify-center">
          <img src={windowSize.width < 740 ? mobileScreen : screen} alt="screenContent" style={screenContentStyle} />
        </div>
        <div className="absolute z-50" style={searchBarWrapperStyle}>
          <Autocomplete
            className="h-14 bg-white p-2 rounded"
            open={open}
            onOpen={() => {
              // only open when in focus and inputValue is not empty
              if (inputValue) {
                setOpen(true);
              }
            }}
            onClose={() => setOpen(false)}
            inputValue={inputValue}
            onInputChange={(_e, value) => {
              setInputValue(value);
              // only open when inputValue is not empty after the user typed something
              if (!value) {
                setOpen(false);
              }
            }}
            freeSolo
            placeholder="Tittel..."
            options={loading ? [] : movies} // display empty array if loading
            getOptionLabel={(option) => option.title}
            onChange={(_event, newValue) => {
              if (newValue) {
                navigate(`/project2/moviePage/${newValue.id}`);
              }
            }}
          />
        </div>
        <div className="absolute" style={filterStyle}>
          <Filter
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            smallScreen={windowSize.width < 740 ? true : false}
          />
        </div>
        <div className="absolute" style={sortStyle}>
          <Sort
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            smallScreen={windowSize.width < 740 ? true : false}
          />
        </div>
        {/* <button onClick={() => (window.location.href = "./searchPage")}> */}
        <div className="absolute z-999" style={btnStyle}>
          <button
            onClick={handleSearchClick}
            className="bg-gray-700 rounded-lg text-white p-2 px-4 min-h-[3.3rem] border-2 border-transparent cursor-pointer transition duration-250 hover:border-[rgb(41,93,227)]"
          >
            Søk
          </button>
        </div>
      </div>
      <div
        className="text-[rgba(255,247,238,0.4)] absolute top-[93%] flex flex-col justify-center items-center"
        style={{ opacity: opacityScreenImg }}
      >
        <p>Bla ned for avansert søk</p>
        <p>&darr;</p>
      </div>
      <img src={windowSize.width < 740 ? mobileSeats : seats} alt="seats" style={seatsStyle} />
      <div className="absolute flex flex-wrap flex-row justify-center w-[77%] gap-14 text-white" style={searchStyle}>
        {/* Display SearchHitCard components based on the current 'cardsToShow' state */}
        {filteredMovies.slice(0, cardsToShow).map((movie, index) => (
          <SearchHitCard
            key={index}
            movieID={movie.id.toString()}
            smallScreen={windowSize.width < 740 ? true : false}
          />
        ))}

        {/* "Load More" button */}
        <div className="h-40 flex justify-center items-center w-full">
          <div className="border-2 border-transparent cursor-pointer transition duration-250 hover:border-[rgb(41,93,227)] bg-gray-700 rounded-lg text-white p-3.3 flex justify-center items-center w-60 text-lg">
            <button onClick={loadMoreCards}>Last flere filmer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
