import "../css/navbar.css";
import "../css/utility.css";
import logoImage from "../assets/M logo 1.png";
import SearchComponent from "./searchComponent";
import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { useState } from "react";
import FavoriteMovie from "./FavoriteMovie";

const Navbar = () => {
  const [showFavoriteMovies, setShowFavoriteMovies] = useState(false);
  const { user } = useSession();

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
                    {user.favorites.map((movie) => (
                      <FavoriteMovie key={movie} tmdbId={movie} />
                    ))}
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
