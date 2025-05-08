import "../css/navbar.css";
import "../css/utility.css";
import logoImage from "../assets/M logo 1.png";
import SearchComponent from "./searchComponent";
import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { useEffect, useState } from "react";
import FavoriteMovie from "./FavoriteMovie";
import { getAllFavorites } from "../utils/favoriteMovies";

const Navbar = () => {
  const [showFavoriteMovies, setShowFavoriteMovies] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { user } = useSession();

  const fetchFavorites = async () => {
    if (user) {
      try {
        const favoritesList = await getAllFavorites();
        setFavorites(favoritesList);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = (tmdbId) => {
    setFavorites(favorites.filter((id) => id !== tmdbId));
  };

  const handleSearch = (result) => {
    if (result.viewAll) {
      window.location.href = `/search_results?q=${encodeURIComponent(
        result.query
      )}`;
    } else {
      const mediaType = "movie";
      window.location.href = `/${mediaType}/${result.id}`;
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container flex justify-between align-center">
        <div className="brand-section flex align-center">
          <Link to="/" className="logo flex align-center cursor">
            <img src={logoImage} alt="Logo" />
            <span className="website-name">OVIE MIX</span>
          </Link>
        </div>

        <div className="nav-controls flex align-center gap-4">
          <div className="search-box">
            <SearchComponent onSearch={handleSearch} />
          </div>
          {user ? (
            <div className="favorite_movies">
              <button
                className="slider-btn play-btn"
                onClick={() => setShowFavoriteMovies(!showFavoriteMovies)}
              >
                <i className="fa-solid fa-heart" />
                <span>Favorite</span>
              </button>

              {/* favorite movies section cards */}
              {showFavoriteMovies && (
                <div className="favorite_movies_cards">
                  <button
                    className="drop_down_close_btn"
                    style={{ backgroundColor: "transparent" }}
                    onClick={() => setShowFavoriteMovies(false)}
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                  <div className="favorite_movies_card flex flex-col align-center gap-4">
                    {favorites.length === 0 ? (
                      <h3 className="empty-favorites">You don't have any favorite movies</h3>
                    ) : (
                      favorites.map((movieId) => (
                        <FavoriteMovie 
                          key={movieId} 
                          tmdbId={movieId} 
                          onRemove={() => {
                            fetchFavorites(); // Refresh the list after removal
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/register" className="auth-btn">
                LOG IN
              </Link>
              <Link to="/register" className="auth-btn">
                SIGN UP
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
