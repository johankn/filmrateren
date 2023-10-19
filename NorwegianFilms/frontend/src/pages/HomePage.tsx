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
import { isMobile } from 'react-device-detect';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import { useQuery } from '@apollo/client';
import { SEARCH_MOVIES_QUERY } from '../queries/SearchQueries';

function HomePage() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState('');

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  const initialCardsToShow = 28; // Number of cards to display initially
  const cardsToLoad = 28; // Number of cards to load when clicking "Load More"
  const [cardsToShow, setCardsToShow] = useState(initialCardsToShow);

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

  const opacity = Math.max(0, Math.min(1, 1 - (scrollPosition - 30) / 80));
  const opacityScreenImg = Math.max(0, Math.min(1, 1 - (scrollPosition - 15) / 30));
  const opacitySeats = Math.max(0, Math.min(1, 1 - (scrollPosition - 20) / 60));
  const opacitySearch = Math.min(1, Math.max(0, (scrollPosition - 45) / 80));
  const opacityFilterSort = Math.min(1, Math.max(0, (scrollPosition - 60) / 40));

  const boxShadowOpacity = opacity * 0.6;
  const boxShadowOpacityScreen = opacity * 0.9;
  const targetHeight = isMobile ? 15 + (50 - 15) * opacity : 8 + (25.2 - 8) * opacity;
  const targetWidth = isMobile ? 85 + (80 - 85) * opacity : 70 + (60 - 70) * opacity;
  const targetMarginTop = isMobile ? 10 + (4 - 10) * opacity : 11 + (6 - 11) * opacity;
  const targetMarginTopSearch = isMobile ? 3 + (35 - 3) * opacity : 2.3 + (16 - 2.3) * opacity;
  const targetWidthSearch = isMobile ? 55 + (70 - 55) * opacity : 25 + (25 - 25) * opacity;
  const targetLeftSearch = isMobile ? 11 + (15 - 11) * opacity : 18 + (37.5 - 18) * opacity;
  const targetMarginTopBtn = 1.4 + (15 - 1.4) * opacity; // 1.6 + (18 - 1.6)
  const targetLeftBtn = 75.5 + (30 - 75.5) * opacity; // 75.5 + (46.5 - 75.5)
  const targetMarginTopSeats = 11 + (0 - 11) * opacity;
  const targetTopSearch = 40 + (60 - 40) * opacity; // KAN FJERNES HVS IKKE TRENGS
  const targetRightFilter = 38 + (50 - 38) * opacity;
  const targetRightSort = 23 + (50 - 23) * opacity;
  const targetTopFilterSort = 1.7 + (14.5 - 1.7) * opacity;

  const homePageStyle = {
    boxShadow: `inset 0 0 0 1000px rgba(16, 16, 16, ${boxShadowOpacity})`,
  };
  const screenStyle = {
    boxShadow: `0 0 40px 1px rgba(255, 247, 238, ${boxShadowOpacityScreen})`,
    height: `${targetHeight}vw`,
    width: `${targetWidth}vw`,
    marginTop: `${targetMarginTop}rem`,
  };
  const searchBarWrapperStyle = {
    marginTop: `${targetMarginTopSearch}vw`,
    width: `${targetWidthSearch}vw`,
    left: `${targetLeftSearch}vw`,
  };

  const filterStyle = {
    opacity: opacityFilterSort,
    right: `${targetRightFilter}rem`,
    marginTop: `${targetTopFilterSort}rem`,
  };

  const sortStyle = {
    opacity: opacityFilterSort,
    right: `${targetRightSort}rem`,
    marginTop: `${targetTopFilterSort}rem`,
  };

  const btnStyle = {
    marginTop: `${targetMarginTopBtn}vw`,
    left: `${targetLeftBtn}vw`,
    opacity: opacityFilterSort,
  };

  const seatsStyle = {
    opacity: opacitySeats,
    marginTop: `${targetMarginTopSeats}vw`,
  };

  const searchStyle = {
    opacity: opacitySearch,
    top: `${targetTopSearch}%`,
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
              opacity: opacitySearch,
              cursor: 'pointer',
              pointerEvents: opacityFilterSort > 0 ? 'auto' : 'none',
            }}
          />
        </div>
        <div className="screen" style={screenStyle}>
          <div className="screenContentWrapper">
            <img src={isMobile ? mobileScreen : screen} alt="screenContent" style={{ opacity: opacityScreenImg }} />
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
            <Filter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
          </div>
          <div
            className="sort"
            style={{
              ...sortStyle,
              pointerEvents: opacityFilterSort > 0 ? 'auto' : 'none',
            }}
          >
            <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
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
        <img src={isMobile ? mobileSeats : seats} alt="seats" className="seatsImage" style={seatsStyle} />
        <div
          className="searchContainer"
          style={{
            ...searchStyle,
            pointerEvents: opacityFilterSort > 0 ? 'auto' : 'none',
          }}
        >
          {/* Display SearchHitCard components based on the current 'cardsToShow' state */}
          {filteredMovies.slice(0, cardsToShow).map((movie, index) => (
            <SearchHitCard key={index} movieID={movie.id.toString()} />
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
