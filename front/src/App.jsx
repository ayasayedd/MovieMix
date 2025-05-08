import React from "react";
import ButtonUp from "./components/bottonup";
import "./App.css";
import "./css/utility.css";
import Navbar from "./components/navbar";
import CategoryPage from "./pages/CategoryPage";
import MovieDetails from "./pages/MovieDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm.jsx";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ButtonUp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<LoginForm />} />
          <Route path="/genre/:genreId" element={<CategoryPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
