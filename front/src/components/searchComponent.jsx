import React, { useState, useEffect } from "react";
import { useTMDB, useDebounce } from "../hooks/useTMDB";
import "../css/searchComponent.css";

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // 1 second delay
  const { searchMedia, isLoading, error } = useTMDB();

  // Effect for API call
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearchTerm) {
        const data = await searchMedia(debouncedSearchTerm);
        setSearchResults(data.results || []);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    };

    fetchResults();
  }, [debouncedSearchTerm, searchMedia]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      setShowResults(false);
    }
  };

  const handleResultClick = (result) => {
    if (onSearch) {
      onSearch(result);
    }
    setShowResults(false);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <div className="input-box">
        <input
          type="text"
          id="searchInput"
          placeholder="Search for movies or TV shows..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
        />
        <i className="bx bx-search"></i>
      </div>

      {showResults && (
        <div className="search-results">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.slice(0, 5).map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="search-result-item"
                >
                  <div className="result-image">
                    {result.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                        alt={result.title || result.name}
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="result-info">
                    <h4>{result.title || result.name}</h4>
                    <p>
                      {result.media_type === "movie" ? "Movie" : "TV Show"} •{" "}
                      {result.release_date || result.first_air_date
                        ? new Date(
                            result.release_date || result.first_air_date
                          ).getFullYear()
                        : "Unknown Year"}
                    </p>
                  </div>
                </li>
              ))}
              {searchResults.length > 5 && (
                <li
                  className="view-all"
                  onClick={() =>
                    handleResultClick({ viewAll: true, query: searchTerm })
                  }
                >
                  View all results
                </li>
              )}
            </ul>
          ) : debouncedSearchTerm ? (
            <div className="no-results">No results found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
