const express = require("express");
const {
  createP,
  getP,
  updateP,
  deleteP,
  getAllP,
  getPostsByUser,
} = require("../controllers/post");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.get("/all", getAllP);
router.get("/user/:id", getPostsByUser);

// Protected Routes
router.post("/", verifyToken, createP);
router.get("/", verifyToken, getP);
router.put("/:id", verifyToken, updateP);
router.delete("/:id", verifyToken, deleteP);

module.exports = router;
