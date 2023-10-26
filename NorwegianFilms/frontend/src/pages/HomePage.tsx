import { useState, useEffect, useCallback } from 'react';
import screen from '../assets/screenContent.svg';
import mobileScreen from '../assets/mobile_screen.svg';
import seats from '../assets/seats.png';
import mobileSeats from '../assets/mobile_seats.png';
import logo from '../assets/film_rateren.svg';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
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
import { useQuery, useLazyQuery } from '@apollo/client';
import { SEARCH_MOVIES_QUERY, GET_FILTERED_MOVIES_QUERY } from '../queries/SearchQueries';
import { getHomePageStyles } from './HomePageDynamicStyles';
import { Movie } from '../components/types';

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

  const initialCardsToShow = 28;
  const [cardsToShow, setCardsToShow] = useRecoilState(cardsToShowState);

  const [getFilteredMovies, { data: moviesData, loading: moviesLoading, error: moviesError }] =
    useLazyQuery(GET_FILTERED_MOVIES_QUERY);

  const loadMoreCards = () => {
    const newSkip = cardsToShow;

    getFilteredMovies({
      variables: {
        title: debouncedValue,
        genres: selectedGenres,
        limit: initialCardsToShow,
        skip: newSkip,
      },
    });

    setCardsToShow((prev) => prev + initialCardsToShow); // Increase the number of cards to show
  };

  const [pagedMovies, setPagedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (moviesData && moviesData.getFilteredMovies) {
      setPagedMovies((prevMovies) => [...prevMovies, ...moviesData.getFilteredMovies]);
    }
  }, [moviesData, cardsToShow]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollPosition]);

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

  const handleSearchClick = useCallback(() => {
    console.log('Selected Sort:', selectedSort);
    setCardsToShow(initialCardsToShow);
    setPagedMovies([]);

    getFilteredMovies({
      variables: {
        title: null,
        genres: selectedGenres,
        limit: initialCardsToShow,
        skip: 0,
      },
    });
  }, [selectedGenres]);

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
            options={searchLoading ? [] : (movies as Movie[])} // display empty array if loading
            getOptionLabel={(option) => (option as Movie)?.title || ''}
            onChange={(_event, newValue) => {
              // Assert that newValue is of type 'Movie'
              const movie = newValue as Movie;
              navigate(`/project2/moviePage/${movie.id}`);
            }}
          />
        </div>
        <div className="absolute" style={filterStyle}>
          <Filter smallScreen={windowSize.width < 740 ? true : false} />
        </div>
        <div className="absolute" style={sortStyle}>
          <Sort smallScreen={windowSize.width < 740 ? true : false} />
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
        {moviesLoading ? (
          <div className="flex justify-center items-center w-full h-60">
            <CircularProgress />
          </div>
        ) : (
          <>
            {/* Display SearchHitCard components based on the current 'cardsToShow' state */}
            {pagedMovies.slice(0, cardsToShow).map((movie, index) => (
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
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
