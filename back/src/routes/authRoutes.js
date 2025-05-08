const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// http://localhost:3001/api/auth/register
// http://localhost:3001/api/auth/login
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.me);

module.exports = router;
