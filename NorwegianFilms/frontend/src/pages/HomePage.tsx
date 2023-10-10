import { useState, useEffect } from "react";
import "./HomePage.css";
import screen from "../assets/screenContent.svg";
import mobileScreen from "../assets/mobile_screen.svg";
import seats from "../assets/seats.png";
import mobileSeats from "../assets/mobile_seats.png";
import Autocomplete from "@mui/joy/Autocomplete";
import movieFile from "../../../backend/src/movies.json";
import { useNavigate } from "react-router-dom";
import SearchHitCard from "../components/SearchHitCard";
import { isMobile } from "react-device-detect";

function HomePage() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const opacity = Math.max(0, Math.min(1, 1 - (scrollPosition - 30) / 80));
  const opacityScreenImg = Math.max(
    0,
    Math.min(1, 1 - (scrollPosition - 15) / 30)
  );
  const opacitySeats = Math.max(0, Math.min(1, 1 - (scrollPosition - 20) / 60));
  const opacitySearch = Math.min(1, Math.max(0, (scrollPosition - 45) / 80));

  const boxShadowOpacity = opacity * 0.6;
  const boxShadowOpacityScreen = opacity * 0.9;
  const targetHeight = isMobile
    ? 15 + (50 - 15) * opacity
    : 8 + (25.2 - 8) * opacity;
  const targetWidth = isMobile
    ? 85 + (80 - 85) * opacity
    : 70 + (60 - 70) * opacity;
  const targetMarginTop = isMobile
    ? 10 + (4 - 10) * opacity
    : 11 + (6 - 11) * opacity;
  const targetMarginTopSearch = isMobile
    ? 3 + (35 - 3) * opacity
    : 3 + (15 - 3) * opacity;
  const targetWidthSearch = isMobile
    ? 55 + (70 - 55) * opacity
    : 35 + (25 - 35) * opacity;
  const targetLeftSearch = isMobile
    ? 11 + (15 - 11) * opacity
    : 18 + (37.5 - 18) * opacity;
  const targetMarginTopBtn = 1.6 + (18 - 1.6) * opacity;
  const targetLeftBtn = 75.5 + (46.5 - 75.5) * opacity;
  const targetMarginTopSeats = 11 + (0 - 11) * opacity;
  const targetTopSearch = 40 + (60 - 40) * opacity;

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

  const btnStyle = {
    marginTop: `${targetMarginTopBtn}vw`,
    left: `${targetLeftBtn}vw`,
  };

  const seatsStyle = {
    opacity: opacitySeats,
    marginTop: `${targetMarginTopSeats}vw`,
  };

  const searchStyle = {
    opacity: opacitySearch,
    top: `${targetTopSearch}%`,
  };

  return (
    <div className="homePageStyle" style={homePageStyle}>
      <div className="screen" style={screenStyle}>
        <div className="screenContentWrapper">
          <img
            src={isMobile ? mobileScreen : screen}
            alt="screenContent"
            style={{ opacity: opacityScreenImg }}
          />
        </div>
        <div className="searchBarWrapper" style={searchBarWrapperStyle}>
          <Autocomplete
            options={movieFile.movies}
            getOptionLabel={(option) => option.title}
            onChange={(_event, newValue) => {
              if (newValue) {
                navigate(`/project2/moviePage/${newValue.id}`);
              }
            }}
          />
        </div>
        {!isMobile && (
          <div className="btn" style={btnStyle}>
            <button>Søk</button>
          </div>
        )}
      </div>
      <div className="arrow" style={{ opacity: opacityScreenImg }}>
        <p>Bla ned for avansert søk</p>
        <p>&darr;</p>
      </div>
      <img
        src={isMobile ? mobileSeats : seats}
        alt="seats"
        className="seatsImage"
        style={seatsStyle}
      />
      <div className="searchContainer" style={searchStyle}>
        <SearchHitCard movieID="1" />
        <SearchHitCard movieID="2" />
        <SearchHitCard movieID="3" />
        <SearchHitCard movieID="4" />
      </div>
    </div>
  );
}

export default HomePage;
