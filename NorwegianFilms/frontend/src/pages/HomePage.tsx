import React, { useState, useEffect } from "react";
import "./HomePage.css";
import screen from "../assets/screenContent.svg";
import Autocomplete from "@mui/joy/Autocomplete";
import movieFile from "../../../backend/src/movies.json";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homePageStyle">
      <div className="screen">
        <img src={screen} alt="screenContent" />
        <Autocomplete
          className="searchBar"
          options={movieFile.movies}
          getOptionLabel={(option) => option.title}
          onChange={(_event, newValue) => {
            if (newValue) {
              navigate(`/project2/moviePage/${newValue.id}`);
            }
          }}
        />
        <div className="btn">
          <button onClick={() => (window.location.href = "./searchPage")}>
            Søk
          </button>
        </div>
      </div>
      <div className="searchContainer">
        <div className="extendedSearchBar">
          <Autocomplete
            options={movieFile.movies}
            getOptionLabel={(option) => option.title}
            onChange={(_event, newValue) => {
              if (newValue) {
                navigate(`/project2/moviePage/${newValue.id}`);
              }
            }}
          />
          <button onClick={() => (window.location.href = "./searchPage")}>
            Søk
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
