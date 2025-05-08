const User = require("../models/User");

const movieController = {
  async addToFavorites(req, res) {
    try {
      const { tmdbId } = req.body;
      const user = await User.findById(req.user.userId);

      if (!user.favorites.includes(tmdbId)) {
        user.favorites.push(tmdbId);
        await user.save();
      }

      res
        .status(200)
        .json({ message: "Movie added to favorites", movieId: tmdbId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getFavorites(req, res) {
    try {
      const { favorites } = await User.findById(req.user.userId);
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async removeFromFavorites(req, res) {
    try {
      const { tmdbId } = req.body;
      const user = await User.findById(req.user.userId);

      user.favorites = user.favorites.filter((id) => id !== tmdbId);
      await user.save();

      res
        .status(200)
        .json({ message: "Movie removed from favorites", movieId: tmdbId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = movieController;
