const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const sendVerificationEmail =
  require("./mailService");




// REGISTER SERVICE
exports.registerUser = async (data) => {

  const {
    name,
    email,
    password,
    role
  } = data;



  const existingUser =
    await User.findOne({ email });

  if (existingUser) {

    throw new Error("User already exists");

  }



  const hashedPassword =
    await bcrypt.hash(password, 10);



  const verificationToken =
    crypto.randomBytes(32).toString("hex");



  await User.create({

    name,

    email,

    password: hashedPassword,

    role,

    verificationToken

  });



  await sendVerificationEmail(
    email,
    verificationToken
  );



  return {
    message:
      "Registration Success. Verify your email."
  };

};




// LOGIN SERVICE
exports.loginUser = async (data) => {

  const { email, password } = data;



  const user = await User.findOne({ email });

  if (!user) {

    throw new Error("Invalid Credentials");

  }



  if (!user.isVerified) {

    throw new Error("Please verify your email");

  }



  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {

    throw new Error("Invalid Credentials");

  }



  // ACCESS TOKEN
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



  // REFRESH TOKEN
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
    accessToken,
    refreshToken
  };

};




// VERIFY EMAIL SERVICE
exports.verifyUserEmail = async (token) => {

  const user = await User.findOne({
    verificationToken: token
  });



  if (!user) {

    throw new Error("Invalid Token");

  }



  user.isVerified = true;

  user.verificationToken = "";

  await user.save();



  return {
    message: "Email Verified Successfully"
  };

};




// REFRESH TOKEN SERVICE
exports.generateNewAccessToken =
  async (refreshToken) => {

    if (!refreshToken) {

      throw new Error(
        "Refresh Token Required"
      );

    }



    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );



    const user = await User.findById(
      decoded.id
    );



    if (!user) {

      throw new Error("User not found");

    }



    if (
      user.refreshToken !== refreshToken
    ) {

      throw new Error(
        "Invalid Refresh Token"
      );

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
      accessToken: newAccessToken
    };

};