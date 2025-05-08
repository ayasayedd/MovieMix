import React, { useState, useEffect } from "react";
import { useTMDB } from "../hooks/useTMDB";
import "../css/MovieCard.css";

// Define genre IDs for different categories
const GENRE_IDS = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37,
};

// MovieCard component for individual movie cards
import { Link } from "react-router-dom";
import { addToFavorites } from "../utils/favoriteMovies";

const MovieCard = ({ movie }) => {
  const handelAddToFavorites = async () => {
    try {
      await addToFavorites(movie.id);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const posterPath = movie.poster_path;
  const posterUrl = posterPath
    ? `${imageBaseUrl}${posterPath}`
    : "/assets/no-poster.png";

  // Extract year from release date
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  // Truncate overview to around 25-30 words
  const truncateOverview = (text, wordLimit = 25) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />

        {/* Gradient overlay for better text visibility */}
        <div className="poster-overlay"></div>

        {/* Quick action buttons that appear on hover */}
        <div className="quick-actions">
          <button className="quick-action-btn play">
            <i className="fa-solid fa-play"></i>
          </button>
          <button
            className="quick-action-btn add"
            onClick={handelAddToFavorites}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <div className="movie-year">{releaseYear}</div>
          <div className="movie-rating">
            <span>★</span>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </div>
        </div>
      </div>

      <div className="movie-overlay">
        <div className="movie-overview">{truncateOverview(movie.overview)}</div>
      </div>
    </Link>
  );
};

// MovieSection component for each genre section
const MovieSection = ({ title, movies, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="movie-section">
        <h2 className="section-title">{title}</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-section">
        <h2 className="section-title">{title}</h2>
        <div className="error-message">Error loading movies: {error}</div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-section">
        <h2 className="section-title">{title}</h2>
        <div className="empty-message">No movies found</div>
      </div>
    );
  }

  return (
    <div className="movie-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <a href="#" className="view-all">
          View All <i className="fa-solid fa-chevron-right"></i>
        </a>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const Movie = () => {
  // State for storing movies by genre
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  // Get TMDB hook functions
  const { getMoviesByGenre, getPopularMovies, isLoading, error } = useTMDB();

  // Fetch popular movies
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await getPopularMovies();
        setPopularMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
      }
    };

    fetchPopularMovies();
  }, [getPopularMovies]);

  // Fetch action movies
  useEffect(() => {
    const fetchActionMovies = async () => {
      try {
        const data = await getMoviesByGenre(GENRE_IDS.ACTION);
        setActionMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching action movies:", err);
      }
    };

    fetchActionMovies();
  }, [getMoviesByGenre]);

  // Fetch comedy movies
  useEffect(() => {
    const fetchComedyMovies = async () => {
      try {
        const data = await getMoviesByGenre(GENRE_IDS.COMEDY);
        setComedyMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching comedy movies:", err);
      }
    };

    fetchComedyMovies();
  }, [getMoviesByGenre]);

  // Fetch horror movies
  useEffect(() => {
    const fetchHorrorMovies = async () => {
      try {
        const data = await getMoviesByGenre(GENRE_IDS.HORROR);
        setHorrorMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching horror movies:", err);
      }
    };

    fetchHorrorMovies();
  }, [getMoviesByGenre]);

  // Fetch romance movies
  useEffect(() => {
    const fetchRomanceMovies = async () => {
      try {
        const data = await getMoviesByGenre(GENRE_IDS.ROMANCE);
        setRomanceMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching romance movies:", err);
      }
    };

    fetchRomanceMovies();
  }, [getMoviesByGenre]);

  return (
    <div className="movie-container">
      <MovieSection
        title="Popular Movies"
        movies={popularMovies.slice(0, 8)}
        isLoading={isLoading && popularMovies.length === 0}
        error={error}
      />

      <MovieSection
        title="Action Movies"
        movies={actionMovies.slice(0, 8)}
        isLoading={isLoading && actionMovies.length === 0}
        error={error}
      />

      <MovieSection
        title="Comedy Movies"
        movies={comedyMovies.slice(0, 8)}
        isLoading={isLoading && comedyMovies.length === 0}
        error={error}
      />

      <MovieSection
        title="Horror Movies"
        movies={horrorMovies.slice(0, 8)}
        isLoading={isLoading && horrorMovies.length === 0}
        error={error}
      />

      <MovieSection
        title="Romance Movies"
        movies={romanceMovies.slice(0, 8)}
        isLoading={isLoading && romanceMovies.length === 0}
        error={error}
      />
    </div>
  );
};

export default Movie;
