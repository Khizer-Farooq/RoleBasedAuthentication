const express = require("express");

const router = express.Router();

const {
  register,
  login,
  refreshAccessToken
  ,verifyEmail
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const User = require("../models/User");


// PUBLIC ROUTES
router.post("/register", register);
router.post("/login", login);

router.get(
  "/verify-email/:token",
  verifyEmail
);
// PROTECTED ROUTE
router.get(
  "/profile",
  authMiddleware,
 async (req, res) => {
   const user = await User.findById(req.user.id)
    .select("-password");
    console.log(user);  



    res.json({
      message: "Profile Accessed",
      user
    });

  }
);


// ADMIN ONLY ROUTE
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {

    res.json({
      message: "Welcome Admin"
    });

  }
);

router.post("/refresh-token",refreshAccessToken);
// USER + ADMIN ROUTE
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("user", "admin"),
  (req, res) => {

    res.json({
      message: "Dashboard Accessed"
    });

  }
);

module.exports = router;