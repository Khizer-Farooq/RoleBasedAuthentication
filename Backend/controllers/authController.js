const authService = require("../services/authService");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {

  try {

    const result = await authService.registerUser(req.body);

    res.status(201).json(result);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

};



exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Credentials"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Credentials"
      });

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
        console.log(refreshToken);
    await user.save();
console.log(user);

    res.json({
      accessToken,
      refreshToken
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.refreshAccessToken =async (req, res) => {
    try{
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                message: "No refresh token provided"
            });
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(400).json({
                message: "user not found"
            });
        }
        if(user.refreshToken !== refreshToken){
            return res.status(400).json({
                message: "Invalid refresh token"
            });
        }
        const newAccessToken = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        })
        res.json({
            accessToken: newAccessToken
        });
    }
    catch(error){
        res.status(401).json({
            message: "Invalid refresh token"
        });
    }

}