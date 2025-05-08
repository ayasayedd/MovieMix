import { useState, useEffect } from "react";
import {
  getCurrentUser,
  login as loginAPI,
  register as registerAPI,
} from "../utils/auth.js";

export const useSession = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginAPI(email, password);
      setUser(data.user);
      window.location.href = '/'; // Redirect to home page
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (username, email, password) => {
    setLoading(true);
    try {
      const data = await registerAPI(username, email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    import("../utils/auth.js").then((mod) => mod.logout());
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
    window.location.reload();
  };

  return { user, loading, signIn, signUp, signOut };
};
