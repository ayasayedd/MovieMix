import React, { useState, useEffect } from "react";
import "../css/movie_details.css";
import { useTMDB } from "../hooks/useTMDB";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
export default function MovieDetails() {
  const { getMovieDetails } = useTMDB();
  const [movieDetails, setMovieDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        console.log(data);

        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [getMovieDetails, id]);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
  const backgroundImage = movieDetails?.backdrop_path
    ? `${imageBaseUrl}${movieDetails.backdrop_path}`
    : movieDetails?.poster_path
    ? `${imageBaseUrl}${movieDetails.poster_path}`
    : "https://via.placeholder.com/1920x800?text=No+Image";

  const truncateOverview = (text, wordLimit = 35) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const truncatedOverview = truncateOverview(movieDetails?.overview);

  return (
    <main className="detail_container">
      <div className="movie-header">
        <div className="movie-title">
          <h2>{movieDetails?.title}</h2>
        </div>
        <img
          src={backgroundImage}
          alt="movie backdrop"
          className="movie-header"
        />
      </div>
      <div className="action-buttons">
        <div className="button-container">
          <h2>WATCH TRAILER</h2>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${
              movieDetails?.videos?.results[
                movieDetails?.videos?.results.length - 1
              ]?.key
            }`}
            controls
            width="80%"
            height="80%"
          />
        </div>
        <div className="button-container">
          <h2>WATCH TRAILER 2</h2>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${
              movieDetails?.videos?.results[
                movieDetails?.videos?.results.length - 2
              ]?.key
            }`}
            controls
            width="80%"
            height="80%"
          />
        </div>
      </div>
      <div className="movie-info">
        <div className="info-section">
          <div className="info-group">
            <h2>OVERVIEW</h2>
            <p>{truncatedOverview}</p>
          </div>
          <div className="info-group">
            <h2>DIRECTOR</h2>
            <p>
              {movieDetails?.credits?.crew?.find(
                (person) => person.job === "Director"
              )?.name || "N/A"}
            </p>
          </div>
          <div className="info-group">
            <h2>WRITER</h2>
            <p>
              {movieDetails?.credits?.crew?.find(
                (person) => person.job === "Screenplay"
              )?.name || "N/A"}
            </p>
          </div>
          <div className="info-group">
            <h2>RELEASE DATE</h2>
            <p>{movieDetails?.release_date || "N/A"}</p>
          </div>
        </div>
        <div className="info-section">
          <div className="info-group">
            <h2>CAST</h2>
            <div className="cast-container">
              {movieDetails?.credits?.cast?.slice(0, 6).map((actor) => (
                <div key={actor.id} className="cast-member">
                  <img
                    src={`${imageBaseUrl}${actor.profile_path}`}
                    alt={actor.name}
                    className="cast-image"
                  />
                  <p className="actor-name">{actor.name}</p>
                  <p className="actor-role">as {actor.character}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="info-group">
            <h2>POSTERS</h2>
            <div className="movie-posters">
              {movieDetails?.images?.posters
                ?.slice(0, 6)
                .map((poster, index) => (
                  <img
                    key={index}
                    src={`${imageBaseUrl}${poster.file_path}`}
                    alt={`Poster ${index + 1}`}
                    className="poster-image"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
