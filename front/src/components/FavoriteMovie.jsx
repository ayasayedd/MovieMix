import React, { useEffect, useState } from "react";
import { useTMDB } from "../hooks/useTMDB";
import { removeFromFavorites } from "../utils/favoriteMovies";
import { toast } from "react-toastify";

export default function FavoriteMovie({ tmdbId, onRemove }) {
  const { getMovieDetails } = useTMDB();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!tmdbId) return;

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
  }, [tmdbId, getMovieDetails]);

  const handleRemoveFromFavorites = async () => {
    try {
      setLoading(true);
      await removeFromFavorites(tmdbId);
      toast.success("Movie removed from favorites");
      // Call onRemove immediately after successful removal
      if (onRemove) {
        onRemove(tmdbId);
      }
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
    <div className="favorite_movie_card" style={{ width: '300px', height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          title={movie?.title || "Movie image"}
          src={moviePosterImage}
          alt={movie?.title || "Movie image"}
          width={50}
          height={70}
          style={{ objectFit: 'cover', borderRadius: '4px' }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1920x800?text=No+Image";
          }}
        />
        <h3 style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {movie?.title}
        </h3>
      </div>
      <button
        className="remove-favorite-btn"
        title="Remove from favorites"
        onClick={handleRemoveFromFavorites}
        disabled={loading}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#ff0000',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '50%',
          transition: 'all 0.3s ease'
        }}
      >
        <i className="fa-solid fa-trash" />
      </button>
    </div>
  );
}
