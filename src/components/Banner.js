import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../requests";
import "../css/Banner.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  async function fetchData() {
    const request = await axios.get(requests.fetchNetflixOriginals);
    setMovie(
      request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ]
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseURL}${movie.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div -> 2 btns */}
        <div className="banner__btns">
          <button className="banner__btn">Play</button>
          <button className="banner__btn">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
