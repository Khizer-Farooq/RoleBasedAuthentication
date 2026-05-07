const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.registerUser = async (data) => {

  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  return {
    message: "User Registered",
    user
  };

};



exports.loginUser = async (data) => {

  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m"
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d"
    }
  );

  user.refreshToken = refreshToken;
  await user.save();

  return {
    message: "Login Success",
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  };

};

exports.refreshAccessToken = async (refreshTokenData) => {

  const { refreshToken } = refreshTokenData;

  if (!refreshToken) {
    throw new Error("No refresh token provided");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m"
    }
  );

  return {
    message: "Token Refreshed",
    accessToken: newAccessToken
  };

};