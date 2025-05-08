import React, { lazy, Suspense } from "react";
import ButtonUp from "./components/bottonup";
import "./App.css";
import "./css/utility.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load route components
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginForm = lazy(() => import("./pages/LoginForm"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ButtonUp />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<LoginForm />} />
            <Route path="/genre/:genreId" element={<CategoryPage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
