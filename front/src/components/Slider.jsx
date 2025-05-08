import React, { useRef, useState, useEffect } from "react";
import "../css/slider.css";
import { useTMDB } from "../hooks/useTMDB";
function SliderItem({ movie }) {
  // Construct the image URL using TMDB's image base URL
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const backdropPath = movie.backdrop_path;
  const posterPath = movie.poster_path;

  // Use backdrop image if available, otherwise use poster image
  const backgroundImage = backdropPath
    ? `${imageBaseUrl}${backdropPath}`
    : posterPath
    ? `${imageBaseUrl}${posterPath}`
    : "";

  // Get the movie title and overview
  const title = movie.title;
  const overview = movie.overview;

  // Truncate overview to around 30-40 words
  const truncateOverview = (text, wordLimit = 35) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const truncatedOverview = truncateOverview(overview);

  return (
    <div
      className="item"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="content">
        <div className="name">{title}</div>
        <div className="title">{truncatedOverview}</div>
        <div className="buttons">
          <button className="slider-btn play-btn">
            <i className="fa-solid fa-play" />
            <span>Watch Now</span>
          </button>
          <button className="slider-btn info-btn">
            <i className="fa-solid fa-info-circle" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const Slider = () => {
  const slideRef = useRef();
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { getTrendingMovies, isLoading, error } = useTMDB();

  // Fetch trending movies when component mounts
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies("week");
        setTrendingMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    };

    fetchTrendingMovies();
  }, [getTrendingMovies]);

  function goToNext() {
    if (!slideRef.current) return;
    let items = slideRef.current.querySelectorAll(".item");
    if (items.length > 0) {
      slideRef.current.appendChild(items[0]);
    }
  }

  function goToPrevious() {
    if (!slideRef.current) return;
    let items = slideRef.current.querySelectorAll(".item");
    if (items.length > 0) {
      slideRef.current.prepend(items[items.length - 1]);
    }
  }

  function handleTouchStart(e) {
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchEnd(e) {
    setTouchEndX(e.changedTouches[0].clientX);
    handleSwipe();
  }

  function handleSwipe() {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
      goToNext();
    } else if (touchEndX - touchStartX > threshold) {
      goToPrevious();
    }
  }

  // Set up auto-slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  if (isLoading) {
    return (
      <div className="container loading-container">
        <div className="loading">Loading trending movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container error-container">
        <div className="error">Error loading trending movies: {error}</div>
      </div>
    );
  }

  if (trendingMovies.length === 0) {
    return (
      <div className="container empty-container">
        <div className="empty">No trending movies found</div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div
          className="slide"
          ref={slideRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {trendingMovies.map((movie) => (
            <SliderItem key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="sliderBTN">
          <button className="prev" onClick={goToPrevious}>
            <i className="fa-solid fa-angle-left sliderBTNButtonI" />
          </button>
          <button className="next" onClick={goToNext}>
            <i className="fa-solid fa-angle-right sliderBTNButtonI" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Slider;
