const API_URL = "http://localhost:3001/api/movies";

export const getAllFavorites = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Please log in to get favorites");
  }

  try {
    const response = await fetch(`${API_URL}/favorites`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get favorites");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw new Error(error.message || "Failed to get favorites");
  }
};

export const addToFavorites = async (movieId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Please log in to add to favorites");
  }

  try {
    const response = await fetch(`${API_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tmdbId: movieId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to add to favorites");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw new Error(error.message || "Failed to add to favorites");
  }
};

export const removeFromFavorites = async (movieId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Please log in to remove from favorites");
  }

  try {
    const response = await fetch(`${API_URL}/favorites`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tmdbId: movieId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to remove from favorites");
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw new Error(error.message || "Failed to remove from favorites");
  }
};
