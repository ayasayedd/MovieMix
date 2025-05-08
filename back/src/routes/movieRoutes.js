const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authenticateToken = require("../middleware/authMiddleware");

router.use(authenticateToken);

router.post("/favorites", movieController.addToFavorites);
router.get("/favorites", movieController.getFavorites);
router.delete("/favorites", movieController.removeFromFavorites);

module.exports = router;
