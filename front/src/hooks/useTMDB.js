import { useState, useCallback, useEffect } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_API_KEY;

export const useTMDB = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMedia = useCallback(async (query, type = "multi", page = 1) => {
    if (!query) return { results: [] };

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/search/${type}?query=${encodeURIComponent(
          query
        )}&page=${page}&include_adult=false`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Failed to search TMDB");
      return { results: [] };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMovieDetails = useCallback(async (movieId) => {
    if (!movieId) return null;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${movieId}?append_to_response=credits,videos,images`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      setError(err.message || "Failed to fetch movie details");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTVDetails = useCallback(async (tvId) => {
    if (!tvId) return null;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/tv/${tvId}?append_to_response=credits,videos,images`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      setError(err.message || "Failed to fetch TV details");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPopularMovies = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/popular?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      setError(err.message || "Failed to fetch popular movies");
      return { results: [] };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTrendingMovies = useCallback(
    async (timeWindow = "week", page = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/trending/movie/${timeWindow}?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`TMDB API error: ${response.status}`);
        }

        return await response.json();
      } catch (err) {
        setError(err.message || "Failed to fetch trending movies");
        return { results: [] };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getMoviesByGenre = useCallback(async (genreId, page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      setError(err.message || `Failed to fetch movies for genre ${genreId}`);
      return { results: [] };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getGenres = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      setError(err.message || "Failed to fetch genres");
      return { genres: [] };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    searchMedia,
    getMovieDetails,
    getTVDetails,
    getPopularMovies,
    getTrendingMovies,
    getMoviesByGenre,
    getGenres,
  };
};

// Custom hook for debouncing search input
export const useDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
