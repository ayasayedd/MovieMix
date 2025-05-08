import React, { useState } from "react";
import "./login.css";
import logoImage from "../assets/M logo 1.png";
import { useSession } from "../hooks/useSession";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { signIn, signUp } = useSession();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const switchForm = () => {
    setIsActive(!isActive);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signIn(formData.email, formData.password);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signUp(formData.username, formData.email, formData.password);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login_body">
      <div className={`login_container ${isActive ? "active" : ""}`}>
        {/* Login Form */}
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <a href="#">
              <img src={logoImage} alt="Logo" />
            </a>
            <h2>Login</h2>

            {error && <p className="error-message">{error}</p>}

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isLoading}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                className="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={isLoading}
              />
              <i className="bx bxs-hide"></i>
            </div>

            <div className="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p onClick={switchForm}>Don't have an account?</p>
          </form>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <a href="#">
              <img src={logoImage} alt="Logo" />
            </a>
            <h2>Sign Up</h2>

            {error && <p className="error-message">{error}</p>}

            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                disabled={isLoading}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isLoading}
              />
              <i className="bx bx-envelope"></i>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                className="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={isLoading}
              />
              <i className="bx bxs-hide"></i>
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <p onClick={switchForm}>Already have an account?</p>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h2>Hello, Welcome!</h2>
            <p>Don't have an account?</p>
            <button onClick={switchForm} className="btn register-btn">
              Sign Up
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h2>Welcome Back!</h2>
            <p>Already have an account?</p>
            <button onClick={switchForm} className="btn login-btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
