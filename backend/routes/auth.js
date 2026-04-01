const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
  AllUsersController,
  updateUserController,
  updateEmailController,
  updatePasswordController,
  userIDController,
} = require("../controllers/auth");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/all", AllUsersController);

// Protected Routes
router.get("/me", verifyToken, currentUserController);
router.put("/profile", verifyToken, updateUserController);
router.put("/email", verifyToken, updateEmailController);
router.put("/password", verifyToken, updatePasswordController);

// Params route
router.get("/:id", userIDController);
module.exports = router;
