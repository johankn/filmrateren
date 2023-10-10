import { useState, useEffect } from "react";
import "./HomePage.css";
import screen from "../assets/screenContent.svg";
import seats from "../assets/seats.png";
import Autocomplete from "@mui/joy/Autocomplete";
import movieFile from "../../../backend/src/movies.json";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

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

  // Calculate opacity based on scroll position
  const opacity = Math.max(0, Math.min(1, 1 - (scrollPosition - 30) / 80));
  const opacityScreenImg = Math.max(
    0,
    Math.min(1, 1 - (scrollPosition - 15) / 30)
  );
  const opacitySeats = Math.max(0, Math.min(1, 1 - (scrollPosition - 20) / 60));
  const opacitySearch = Math.min(1, Math.max(0, (scrollPosition - 45) / 80));

  const boxShadowOpacity = opacity * 0.6;
  const boxShadowOpacityScreen = opacity * 0.9;
  const targetHeight = 8 + (25.2 - 8) * opacity; // Adjusted height based on opacity
  const targetWidth = 70 + (60 - 70) * opacity; // Adjusted width based on opacity
  const targetMarginTop = 15 + (9.2 - 15) * opacity; // Adjusted margin top based on opacity
  const targetMarginTopSearch = 3 + (15 - 3) * opacity; // Adjusted margin top based on opacity
  const targetWidthSearch = 35 + (25 - 35) * opacity; // Adjusted width based on opacity
  const targetLeftSearch = 18 + (37.5 - 18) * opacity; // Adjusted left based on opacity
  const targetMarginTopBtn = 1.6 + (18 - 1.6) * opacity; // Adjusted margin top based on opacity
  const targetLeftBtn = 75.5 + (46.5 - 75.5) * opacity; // Adjusted left based on opacity
  const targetMarginTopSeats = 11 + (0 - 11) * opacity; // Adjusted margin top based on opacity
  const targetTopSearch = 50 + (50 - 50) * opacity; // Adjusted top based on opacity KAN FJERNES HVS IKKE TRENGS

  const homePageStyle = {
    boxShadow: `inset 0 0 0 1000px rgba(16, 16, 16, ${boxShadowOpacity})`,
  };
  const screenStyle = {
    boxShadow: `0 0 40px 1px rgba(255, 247, 238, ${boxShadowOpacityScreen})`,
    height: `${targetHeight}vw`,
    width: `${targetWidth}vw`,
    marginTop: `${targetMarginTop}vw`,
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
            src={screen}
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
        {/* <button onClick={() => (window.location.href = "./searchPage")}> */}
        <div className="btn" style={btnStyle}>
          <button>Søk</button>
        </div>
      </div>
      <div className="arrow" style={{ opacity: opacityScreenImg }}>
        <p>Bla ned for avansert søk</p>
        <p>&darr;</p>
      </div>
      <img src={seats} alt="seats" className="seatsImage" style={seatsStyle} />
      <div className="searchContainer" style={searchStyle}>
        <MovieCard movieID={"1"}></MovieCard>
        <MovieCard movieID={"2"}></MovieCard>
        <MovieCard movieID={"3"}></MovieCard>
        <MovieCard movieID={"4"}></MovieCard>
      </div>
    </div>
  );
}

export default HomePage;
