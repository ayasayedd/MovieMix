import React, { useEffect, useState } from "react";
import { useTMDB } from "../hooks/useTMDB";
import { removeFromFavorites } from "../utils/favoriteMovies";
import { toast } from "react-toastify";

export default function FavoriteMovie({ tmdbId }) {
  const { getMovieDetails } = useTMDB();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(tmdbId);
        setMovie(movieData);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error(`Error loading movie: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [tmdbId]);

  const handleRemoveFromFavorites = async () => {
    try {
      setLoading(true);
      await removeFromFavorites(tmdbId);
      toast.success("Movie removed from favorites");
      // Refresh the parent component to update the favorites list
      window.location.reload();
    } catch (err) {
      setError(err.message);
      toast.error(`Error removing movie: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="favorite_movie_card">
        <div className="loading-placeholder" />
        <div className="flex align-center gap-4">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorite_movie_card">
        <div className="error-placeholder" />
        <div className="flex align-center gap-4">
          <h3>Error: {error}</h3>
        </div>
      </div>
    );
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const moviePosterImage = movie?.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/1920x800?text=No+Image";

  return (
    <div className="favorite_movie_card">
      <img
        title={movie?.title || "Movie image"}
        src={moviePosterImage}
        alt={movie?.title || "Movie image"}
        width={50}
        height={50}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/1920x800?text=No+Image";
        }}
      />
      <div className="flex align-center gap-4">
        <h3>{movie?.title}</h3>
        <button
          className="slider-btn play-btn"
          title="Remove from favorites"
          onClick={handleRemoveFromFavorites}
          disabled={loading}
        >
          <i className="fa-solid fa-trash" />
        </button>
      </div>
    </div>
  );
}
