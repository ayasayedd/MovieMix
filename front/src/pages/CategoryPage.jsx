import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTMDB } from "../hooks/useTMDB";
import { MovieCard } from "../components/Movie"; // Using named import
import "../css/CategoryPage.css";

const CategoryPage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { getMoviesByGenre } = useTMDB();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getMoviesByGenre(genreId, page);
        setMovies((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [genreId, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="category-page">
      <div className="category-content">
        <h1>Movies</h1>
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {!loading && (
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {loading && <div className="loading">Loading...</div>}
      </div>
    </div>
  );
};

export default CategoryPage;
