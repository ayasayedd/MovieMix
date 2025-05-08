const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (username, email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  return { token, newUser };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
  // Only return necessary user data
  const userData = {
    _id: user._id,
    username: user.username,
    email: user.email
  };
  
  return { token, user: userData };
};

const me = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  register,
  login,
  me,
};
