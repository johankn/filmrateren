import { useState, useEffect } from 'react';
import './HomePage.css';
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
import { selectedSortState, scrollPositionState, selectedGenresState, inputValueState, cardsToShowState} from '../atoms';
import { useQuery } from '@apollo/client';
import { SEARCH_MOVIES_QUERY } from '../queries/SearchQueries';

function HomePage() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useRecoilState(scrollPositionState);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const selectedGenres = useRecoilValue(selectedGenresState)
  const selectedSort = useRecoilValue(selectedSortState)

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useRecoilState(inputValueState);
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

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

  console.log('Movies:', movies)

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

  const opacity = Math.max(0, Math.min(1, 1 - (scrollPosition - 30) / 80));
  const opacityScreenImg = Math.max(0, Math.min(1, 1 - (scrollPosition - 15) / 30));
  const opacitySeats = Math.max(0, Math.min(1, 1 - (scrollPosition - 20) / 60));
  const opacitySearch = Math.min(1, Math.max(0, (scrollPosition - 45) / 80));
  const opacityFilterSort = Math.min(1, Math.max(0, (scrollPosition - 60) / 40));

  const boxShadowOpacity = opacity * 0.6;
  const boxShadowOpacityScreen = opacity * 0.9;

  let targetHeight;
  let targetWidth;
  let targetMarginTop;
  let targetMarginTopSearch;
  let targetWidthSearch;
  let targetLeftSearch;
  let targetMarginTopBtn;
  let targetRightBtn;
  let targetMarginTopSeats;
  let targetTopSearch;
  let targetRightFilter;
  let targetRightSort;
  let targetTopFilterSort;
  let targetHeightImg;
  let targetTopScreenContent;

  if (windowSize.width >= 1110) {
    targetHeight = 125 + (382 - 125) * opacity; // GOOD
    targetWidth = 1040 + (910 - 1040) * opacity; // GOOD
    targetMarginTop = 176 + (96 - 176) * opacity; // GOOD
    targetMarginTopSearch = 35 + (250 - 35) * opacity; // GOOD
    targetWidthSearch = 380 + (380 - 380) * opacity; // GOOD
    targetLeftSearch = 30 + (265 - 30) * opacity; // GOOD
    targetMarginTopBtn = 20 + (235 - 20) * opacity; // GOOD
    targetRightBtn = 20 + (500 - 20) * opacity; // GOOD
    targetMarginTopSeats = 200 + (0 - 200) * opacity; // GOOD
    targetTopSearch = 350 + (525 - 350) * opacity; // GOOD
    targetRightFilter = 375 + (500 - 375) * opacity; // GOOD
    targetRightSort = 125 + (500 - 125) * opacity; // GOOD
    targetTopFilterSort = 27 + (245 - 27) * opacity; // GOOD
    targetHeightImg = 300 + (570 - 300) * opacity;
    targetTopScreenContent = 1 + (10 - 1) * opacity;
  } else if (windowSize.width >= 740) {
    targetHeight = 150 + (382 - 150) * opacity; // GOOD
    targetWidth = 720 + (700 - 720) * opacity; // GOOD
    targetMarginTop = 176 + (96 - 176) * opacity; // GOOD
    targetMarginTopSearch = 15 + (250 - 15) * opacity; // GOOD
    targetWidthSearch = 565 + (380 - 565) * opacity; // GOOD
    targetLeftSearch = 30 + (165 - 30) * opacity; // GOOD
    targetMarginTopBtn = 1 + (235 - 1) * opacity; // GOOD
    targetRightBtn = 20 + (500 - 20) * opacity; // GOOD
    targetMarginTopSeats = 200 + (0 - 200) * opacity; // GOOD
    targetTopSearch = 350 + (525 - 350) * opacity;
    targetRightFilter = 343 + (343 - 343) * opacity;
    targetRightSort = 117 + (117 - 117) * opacity;
    targetTopFilterSort = 70 + (245 - 70) * opacity;
    targetHeightImg = 300 + (570 - 300) * opacity;
    targetTopScreenContent = 0 + (0 - 0) * opacity;
  } else {
    targetHeight = 200 + (250 - 200) * opacity; // GOOD
    targetWidth = 350 + (350 - 350) * opacity; // GOOD
    targetMarginTop = 176 + (96 - 176) * opacity; // GOOD
    targetMarginTopSearch = 15 + (165 - 15) * opacity; // GOOD
    targetWidthSearch = 300 + (300 - 300) * opacity; // GOOD
    targetLeftSearch = 25 + (25 - 25) * opacity; // GOOD
    targetMarginTopBtn = 125 + (60 - 125) * opacity; // GOOD
    targetRightBtn = 123 + (123 - 123) * opacity; // GOOD
    targetMarginTopSeats = 50 + (0 - 50) * opacity; // GOOD
    targetTopSearch = 420 + (480 - 420) * opacity;
    targetRightFilter = 172 + (172 - 172) * opacity;
    targetRightSort = 18 + (18 - 18) * opacity;
    targetTopFilterSort = 70 + (110 - 70) * opacity;
    targetHeightImg = 160 + (160 - 160) * opacity;
    targetTopScreenContent = 1 + (10 - 1) * opacity;
  }

  const homePageStyle = {
    boxShadow: `inset 0 0 0 1000px rgba(16, 16, 16, ${boxShadowOpacity})`,
  };
  const screenStyle = {
    boxShadow: `0 0 40px 1px rgba(255, 247, 238, ${boxShadowOpacityScreen})`,
    height: `${targetHeight}px`,
    width: `${targetWidth}px`,
    marginTop: `${targetMarginTop}px`,
  };
  const searchBarWrapperStyle = {
    marginTop: `${targetMarginTopSearch}px`,
    width: `${targetWidthSearch}px`,
    left: `${targetLeftSearch}px`,
  };

  const filterStyle = {
    opacity: opacityFilterSort,
    right: `${targetRightFilter}px`,
    marginTop: `${targetTopFilterSort}px`,
  };

  const sortStyle = {
    opacity: opacityFilterSort,
    right: `${targetRightSort}px`,
    marginTop: `${targetTopFilterSort}px`,
  };

  const btnStyle = {
    marginTop: `${targetMarginTopBtn}px`,
    right: `${targetRightBtn}px`,
    opacity: opacityFilterSort,
  };

  const seatsStyle = {
    opacity: opacitySeats,
    marginTop: `${targetMarginTopSeats}px`,
  };

  const searchStyle = {
    opacity: opacitySearch,
    top: `${targetTopSearch}px`,
  };

  const screenContentStyle = {
    opacity: opacityScreenImg,
    height: `${targetHeightImg}px`,
    marginTop: `${targetTopScreenContent}px`,
  };

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

    console.log('Before selection');

    if (selectedSort == '10') {
      // Sort by title in ascending order
      filtered = filtered.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    } else if (selectedSort == '20') {
      console.log('If selected is 20');
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

    console.log('After');

    setFilteredMovies(filtered);
  };

  useEffect(() => { // Search every time HomePage renders in order to load the right movies for the saved user choices 
    handleSearchClick();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  };

  return (
    <body>
      <div className="homePageStyle" style={homePageStyle}>
        <div className="logo" onClick={handleLogoClick}>
          <img
            src={logo}
            alt="logo"
            style={{
              opacity: windowSize.width < 740 ? 0 : opacitySearch,
              cursor: 'pointer',
              pointerEvents: opacityFilterSort > 0 ? 'auto' : 'none',
            }}
          />
        </div>
        <div className="screen" style={screenStyle}>
          <div className="screenContentWrapper">
            <img src={windowSize.width < 740 ? mobileScreen : screen} alt="screenContent" style={screenContentStyle} />
          </div>
          <div className="searchBarWrapper" style={searchBarWrapperStyle}>
            <Autocomplete
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
              style={{ height: '3.5rem', backgroundColor: 'white' }}
              options={loading ? [] : movies} // display empty array if loading
              getOptionLabel={(option) => option.title}
              onChange={(_event, newValue) => { 
                if (newValue) {
                    navigate(`/project2/moviePage/${newValue.id}`);
                }
            }}
            />
          </div>
          <div className="filter" style={{ ...filterStyle, pointerEvents: opacityFilterSort > 0 ? 'auto' : 'none' }}>
            <Filter
              smallScreen={windowSize.width < 740 ? true : false}
            />
          </div>
          <div
            className="sort"
            style={{
              ...sortStyle,
              pointerEvents: opacityFilterSort > 0 ? 'auto' : 'none',
            }}
          >
            <Sort        
              smallScreen={windowSize.width < 740 ? true : false}
            />
          </div>
          {/* <button onClick={() => (window.location.href = "./searchPage")}> */}
          <div
            className="btn"
            style={{
              ...btnStyle,
              pointerEvents: opacityFilterSort > 0 ? 'auto' : 'none',
            }}
          >
            <button onClick={handleSearchClick}>Søk</button>
          </div>
        </div>
        <div className="arrow" style={{ opacity: opacityScreenImg }}>
          <p>Bla ned for avansert søk</p>
          <p>&darr;</p>
        </div>
        <img src={windowSize.width < 740 ? mobileSeats : seats} alt="seats" className="seatsImage" style={seatsStyle} />
        <div
          className="searchContainer"
          style={{
            ...searchStyle,
            pointerEvents: opacityFilterSort > 0 ? 'auto' : 'none',
          }}
        >
          {/* Display SearchHitCard components based on the current 'cardsToShow' state */}
          {filteredMovies.slice(0, cardsToShow).map((movie, index) => (
            <SearchHitCard
              key={index}
              movieID={movie.id.toString()}
              smallScreen={windowSize.width < 740 ? true : false}
            />
          ))}

          {/* "Load More" button */}
          <div
            style={{
              height: '10rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'top', // To vertically center text
              width: '100%',
            }}
          >
            <div
              className="load"
              style={{
                backgroundColor: '#3d3d3d',
                borderRadius: '12px',
                color: '#ffffff',
                padding: '10px 20px',
                height: '3.3rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', // To vertically center text
                width: '15rem',
                fontSize: '1rem',
              }}
            >
              <button onClick={loadMoreCards}>Last flere filmer</button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default HomePage;
