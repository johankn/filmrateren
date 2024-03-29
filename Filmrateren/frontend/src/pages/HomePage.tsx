import { useState, useEffect, useCallback } from 'react';
import screen from '../assets/screen_content.svg';
import mobileScreen from '../assets/mobile_screen.svg';
import mediumScreen from '../assets/medium_screen.svg';
import seats from '../assets/seats.png';
import mobileSeats from '../assets/mobile_seats.png';
import logo from '../assets/film_rateren.svg';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import { useNavigate } from 'react-router-dom';
import SearchHitCard from '../components/SearchHitCard';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import { useRecoilState } from 'recoil';
import {
  selectedSortState,
  scrollPositionState,
  selectedGenresState,
  cardsToShowState,
  selectedTitleState,
  isCheckedState,
  selectedProvidersState,
} from '../atoms';
import { useQuery, useLazyQuery } from '@apollo/client';
import { SEARCH_MOVIES_QUERY, GET_FILTERED_MOVIES_QUERY } from '../queries/SearchQueries';
import { getHomePageStyles } from '../components/DynamicStyles';
import { Movie } from '../components/types';
import { Checkbox, TextField, Tooltip, Zoom } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useRecoilState(scrollPositionState);
  const [changeHeight, setChangeHeight] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [selectedGenres, setSelectedGenres] = useRecoilState(selectedGenresState);
  const [previousGenres, setPreviousGenres] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useRecoilState(selectedProvidersState);
  const [previousProviders, setPreviousProviders] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useRecoilState(selectedSortState);
  const [previousSort, setPreviousSort] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useRecoilState(selectedTitleState);
  const [previousTitle, setPreviousTitle] = useState<string>('');
  const [previousCheckbox, setPreviousCheckbox] = useState(false);
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState);
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const [cardsToShow, setCardsToShow] = useRecoilState(cardsToShowState);
  const [pagedMovies, setPagedMovies] = useState<Movie[]>([]);
  const initialCardsToShow = 28;

  // Import styles from DynamicStyles.tsx so that the components change styling based on the scroll position
  const {
    opacitySearch,
    opacityScreenImg,
    homePageStyle,
    screenStyle,
    searchBarWrapperStyle,
    genresStyle,
    providersStyle,
    sortStyle,
    btnStyle,
    seatsStyle,
    searchStyle,
    screenContentStyle,
    logoStyle,
    buttonStyle,
    newSearchBarStyle,
    searchWidth,
    checkBoxStyle,
    resetStyle,
  } = getHomePageStyles(
    windowSize,
    scrollPosition,
    selectedSort == 'RELEASEYEAR_ASC' ||
      selectedSort == 'RELEASEYEAR_DESC' ||
      selectedSort == 'RUNTIME_ASC' ||
      selectedSort == 'RUNTIME_DESC' ||
      selectedSort == 'IMDB_ASC' ||
      selectedSort == 'IMDB_DESC' ||
      selectedSort == 'POPULARITY_DESC',
    selectedTitle == '' && selectedSort == '' && selectedGenres.length == 0 && selectedProviders.length == 0,
  );

  // Use a debouncer to delay the search query, so that the database is not called on every keystroke
  useEffect(() => {
    // Setup a debouncer for 500ms
    const debouncer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    // Cleanup the debouncer
    return () => {
      clearTimeout(debouncer);
    };
  }, [inputValue]);

  // Retrieve the response from the simple search query
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useQuery(SEARCH_MOVIES_QUERY, {
    variables: { title: debouncedValue },
    skip: !debouncedValue, // Skip the query if debouncedValue is empty
  });

  const movies: Movie[] | undefined = searchData?.searchMovies || [];

  if (searchError) {
    console.error('Error fetching movies:', searchError.message);
  }

  // Retrieve the response from the filtered search query
  const [getFilteredMovies, { data: moviesData, loading: moviesLoading, error: moviesError }] =
    useLazyQuery(GET_FILTERED_MOVIES_QUERY);

  if (moviesError) {
    console.error('Error fetching movies:', moviesError.message);
  }

  // Load the next 28 (or other values set in initialCardsToShow) movies when the user clicks the load more button
  const loadMoreCards = () => {
    const newSkip = cardsToShow;
    console.log('New Skip:', newSkip);

    getFilteredMovies({
      variables: {
        title: selectedTitle,
        genres: selectedGenres,
        providers: selectedProviders,
        sort: selectedSort,
        checkbox: Boolean(isChecked),
        limit: initialCardsToShow,
        skip: newSkip,
      },
    });

    setCardsToShow((prev) => prev + initialCardsToShow); // Increase the number of cards to show
  };

  // Updates the paged movies that should be shown
  useEffect(() => {
    if (moviesData && moviesData.getFilteredMovies) {
      setPagedMovies((prevMovies) => [...prevMovies, ...moviesData.getFilteredMovies]);

      // Check if movies have loaded
      if (moviesData.getFilteredMovies.length > 0) {
        // Workaround for a bug:
        // When returning from MoviePage, the screen would jump to the top due to the screen height being insufficient
        // to scroll to the previous position until the movies have loaded. To address this, we set a timeout to
        // change the screen height, allowing it time to return to the previous scroll position.
        // This helps in creating a smoother transition and prevents the screen jump.
        setTimeout(() => {
          setChangeHeight(true);
        }, 1);
      }
    }
  }, [moviesData, cardsToShow]);

  // The height of the screen is changed when changeHeight is updated
  const heightStyle =
    changeHeight || moviesError ? { height: '0px', width: '100%' } : { height: '50000px', width: '100%' };

  // Updates the scroll position to be used in DynamicStyles.tsx
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollPosition]);

  // Updates the window size to be used in components and DynamicStyles.tsx so that they match
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

  // Scrolls to top when logo is clicked
  const handleLogoClick = () => {
    if (opacitySearch == 1) {
      scrollToTop();
    }
  };

  // Sets the title that should be searched for
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedTitle(event.target.value);
  };

  // Searches for input with user choices
  const handleSearchClick = useCallback(() => {
    setCardsToShow(initialCardsToShow);
    setPagedMovies([]);
    setPreviousTitle(selectedTitle);
    setPreviousGenres(selectedGenres);
    setPreviousProviders(selectedProviders);
    setPreviousSort(selectedSort);
    setPreviousCheckbox(isChecked);

    getFilteredMovies({
      variables: {
        title: selectedTitle,
        genres: selectedGenres,
        providers: selectedProviders,
        sort: selectedSort,
        checkbox: Boolean(isChecked),
        limit: initialCardsToShow,
        skip: 0,
      },
    });
  }, [selectedTitle, selectedGenres, selectedProviders, selectedSort, isChecked, getFilteredMovies, setCardsToShow]);

  // Make sure that the same cards as before are shown when returning to HomePage, i.e. search and load the same cards
  const reloadMovies = useCallback(() => {
    setCardsToShow(cardsToShow);
    setPagedMovies([]);
    setPreviousTitle(selectedTitle);
    setPreviousGenres(selectedGenres);
    setPreviousProviders(selectedProviders);
    setPreviousSort(selectedSort);
    setPreviousCheckbox(isChecked);

    getFilteredMovies({
      variables: {
        title: selectedTitle,
        genres: selectedGenres,
        providers: selectedProviders,
        sort: selectedSort,
        checkbox: Boolean(isChecked),
        limit: cardsToShow,
        skip: 0,
      },
    });
  }, [
    setCardsToShow,
    cardsToShow,
    selectedTitle,
    selectedGenres,
    selectedProviders,
    selectedSort,
    isChecked,
    getFilteredMovies,
  ]);

  // Checks if the user choices has changed
  const hasSelectionChanged = () => {
    return (
      JSON.stringify(previousGenres) !== JSON.stringify(selectedGenres) ||
      JSON.stringify(previousProviders) !== JSON.stringify(selectedProviders) ||
      previousSort !== selectedSort ||
      previousTitle !== selectedTitle ||
      previousCheckbox !== isChecked
    );
  };

  // Updates the check of the checkbox
  const handleCheckBoxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked);
    },
    [setIsChecked],
  );

  // Resets all user choices
  const handleResetClick = () => {
    setSelectedTitle('');
    setSelectedSort('');
    setSelectedGenres([]);
    setSelectedProviders([]);
  };

  // Reload movies when rendering page
  useEffect(() => {
    reloadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const noMoreMovies = moviesData && moviesData.getFilteredMovies && moviesData.getFilteredMovies.length < 28;

  const handleScrollDown = () => {
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  };

  // Scroll to search bar when pressing tab on autocomplete to facilitate for keyboard navigation
  const handleTab = () => {
    const searchBar = document.getElementById('new-search-bar');
    console.log('searchbar', searchBar != null);
    if (searchBar) {
      searchBar.scrollIntoView({
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  return (
    <div
      className="home-page m-0 flex flex-col justify-start items-center w-full min-h-[180vh] overflow-x-hidden gap-16"
      style={homePageStyle}
    >
      {/* Clickable logo top left */}
      <figure className="fixed top-0 left-0 mt-8 ml-8 w-16 h-auto z-9998" onClick={handleLogoClick}>
        <img src={logo} alt="Film Rateren Logo" className="cursor-pointer" style={logoStyle} />
      </figure>
      {/* Movie screen container */}
      <main className="bg-screen flex flex-col justify-start items-center relative" style={screenStyle}>
        {/* Picture with logo and screen content */}
        <figure className="absolute flex flex-row justify-center">
          <img
            src={windowSize.width < 740 ? mobileScreen : windowSize.width < 1110 ? mediumScreen : screen}
            alt="screenContent"
            style={screenContentStyle}
          />
        </figure>
        {/* Search bar autocomplete*/}
        <section className="absolute z-50" id="autocomplete-search-bar" style={searchBarWrapperStyle}>
          <Autocomplete
            sx={{
              borderRadius: '10px',
            }}
            className="h-14 bg-white p-2"
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
            freeSolo={false}
            placeholder="Tittel..."
            // display empty array if loading
            options={searchLoading ? [] : (movies as Movie[])}
            getOptionLabel={(option) => (option as Movie)?.title || ''}
            onChange={(_event, newValue) => {
              // Assert that newValue is of type 'Movie'
              const movie = newValue as Movie;
              navigate(`/project2/moviePage/${movie.id}`);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Tab') {
                console.log('tab');
                handleTab();
              }
            }}
          />
        </section>
        {/* Search bar input */}
        <section className="absolute z-50" style={newSearchBarStyle}>
          <TextField
            className="bg-white rounded fixed"
            style={{ width: searchWidth }}
            id="new-search-bar"
            label="Tittel..."
            variant="outlined"
            value={selectedTitle}
            onChange={handleTitleChange}
            sx={{
              borderRadius: '14px',
            }}
            InputProps={{
              sx: {
                '& fieldset': {
                  borderRadius: '14px',
                },
              },
            }}
          />
        </section>
        {/* Filter on genres*/}
        <section className="absolute" style={genresStyle}>
          <Filter
            smallScreen={windowSize.width < 740 ? true : false}
            mediumScreen={windowSize.width >= 740 && windowSize.width < 1110 ? true : false}
            filterType="genres"
          />
        </section>
        <section className="absolute" style={providersStyle}>
          <Filter
            smallScreen={windowSize.width < 740 ? true : false}
            mediumScreen={windowSize.width >= 740 && windowSize.width < 1110 ? true : false}
            filterType="providers"
          />
        </section>
        {/* Sort */}
        <section className="absolute" style={sortStyle}>
          <Sort
            smallScreen={windowSize.width < 740 ? true : false}
            mediumScreen={windowSize.width >= 740 && windowSize.width < 1110 ? true : false}
          />
        </section>
        <section style={checkBoxStyle} className="absolute flex flex-row justify-center items-center">
          <p className="text-zinc-800">Fjern filmer uten data</p>
          <Tooltip
            TransitionComponent={Zoom}
            arrow
            onChange={handleCheckBoxChange}
            title={
              <h2 className="text-base">
                Denne knappen vil fjerne alle filmer som ikke har den dataen du har sortert på. F.eks. filmer som ikke
                har noen IMDB rating.
              </h2>
            }
          >
            <Checkbox
              checked={isChecked}
              tabIndex={
                selectedSort === 'RELEASEYEAR_ASC' ||
                selectedSort === 'RELEASEYEAR_DESC' ||
                selectedSort === 'RUNTIME_ASC' ||
                selectedSort === 'RUNTIME_DESC' ||
                selectedSort === 'IMDB_ASC' ||
                selectedSort === 'IMDB_DESC' ||
                selectedSort == 'POPULARITY_DESC'
                  ? 0
                  : -1
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setIsChecked(!isChecked);
                }
              }}
              sx={{
                color: 'gray-700',
                '&.Mui-checked': {
                  color: 'rgb(55, 65, 81)',
                },
              }}
            />
          </Tooltip>
        </section>
        {/* Search button */}
        <section className="absolute z-999" style={btnStyle}>
          <button
            style={buttonStyle}
            onClick={handleSearchClick}
            disabled={!hasSelectionChanged()}
            className="bg-darkgrey rounded-base text-white p-2 px-4 border-2 border-transparent cursor-pointer transition duration-250 hover:border-[rgb(41,93,227)] focus:outline-none focus:ring focus:border-[rgb(41,93,227)]"
          >
            Søk
          </button>
        </section>
        <button
          className="absolute bg-darkgrey rounded-base text-small text-white p-1 px-3 border-transparent cursor-pointer transition duration-250 hover:border-[rgb(41,93,227)] focus:outline-none focus:ring focus:border-[rgb(41,93,227)]"
          style={resetStyle}
          onClick={handleResetClick}
        >
          Reset
        </button>
      </main>
      {/* Scroll down indicator */}
      <button
        className={`text-[rgba(255,247,238,0.8)] fixed hover:scale-105 ${
          windowSize.width < 740 ? 'top-[90%]' : 'top-[92%]'
        } flex flex-col justify-center items-center ${windowSize.width < 740 ? 'text-base' : 'text-base'}`}
        style={{
          opacity: opacityScreenImg,
          pointerEvents: opacityScreenImg == 1 ? 'auto' : ('none' as React.CSSProperties['pointerEvents']),
          textShadow: '0 0 20px rgba(255, 247, 238, 0.6)',
        }}
        onClick={handleScrollDown}
      >
        Bla ned for avansert søk
        <span>&darr;</span>
      </button>
      {/* Seats */}
      <img src={windowSize.width < 740 ? mobileSeats : seats} alt="seats" style={seatsStyle} />
      {/* Search hits */}
      <section
        className="absolute flex flex-wrap flex-row justify-center w-[83%] gap-14 text-white"
        style={searchStyle}
      >
        <div style={heightStyle} className="absolute top-[200px] flex justify-center">
          {moviesError ? 'Klarte ikke å laste filmer' : undefined}
        </div>
        {moviesLoading ? (
          <div className="flex justify-center items-center w-full">
            <CircularProgress />
          </div>
        ) : (
          <>
            {/* Display SearchHitCard components based on the current 'cardsToShow' state */}
            {pagedMovies.slice(0, cardsToShow).map((movie, index) => (
              <SearchHitCard
                key={index}
                movie={movie}
                screenSize={windowSize.width < 740 ? 'small' : windowSize.width < 1110 ? 'medium' : ''}
              />
            ))}

            {/* "Load More" button */}
            {moviesData && moviesData.getFilteredMovies && moviesData.getFilteredMovies.length === 0 ? (
              <section className="h-40 flex justify-center items-center w-full">
                <p className="border-2 border-transparent transition duration-250 rounded-base text-white p-3.3 flex justify-center items-center w-60 text-lg">
                  Ingen flere filmer funnet.
                </p>
              </section>
            ) : !moviesError ? (
              <section className="h-40 flex justify-center items-center w-full">
                <div
                  className={`border-2 ${
                    noMoreMovies
                      ? 'opacity-50 border-transparent'
                      : 'hover:bg-zinc-800 hover:scale-110 cursor-pointer border-yellow'
                  } bg-darkgrey rounded-base text-white p-3.3 flex justify-center items-center w-60 text-lg`}
                >
                  <button
                    className="h-14"
                    onClick={loadMoreCards}
                    disabled={noMoreMovies}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        loadMoreCards();
                      }
                    }}
                  >
                    {noMoreMovies ? 'Ingen flere filmer' : 'Last flere filmer'}
                  </button>
                </div>
              </section>
            ) : undefined}
          </>
        )}
      </section>
    </div>
  );
}

export default HomePage;
