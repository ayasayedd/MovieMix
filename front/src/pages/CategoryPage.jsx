import React from "react";
import Navbar from "../components/navbar";
import ButtonUp from "../components/bottonup";
import "../css/CategoryPage.css";

const CategoryPage = ({ title }) => {
  return (
    <div className="category-page">
      <Navbar />
      <div className="category-content">
        <h1>{title}</h1>
        <div className="movie-grid">
          {placeholderMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-image">
                <img src={movie.image} alt={movie.title} />
              </div>
              <div className="movie-title">{movie.title}</div>
            </div>
          ))}
        </div>
      </div>
      <ButtonUp />
    </div>
  );
};

export default CategoryPage;
