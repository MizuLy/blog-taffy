const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../models/post");

// CREATE
const createP = async (req, res) => {
  try {
    const { text, media } = req.body;
    const user_id = req.user.id;

    if (!text && !media)
      return res.status(400).json({ message: "Text or image is required" });

    const result = await createPost(user_id, text, media);
    res.status(201).json({
      message: "Post created",
      result: {
        id: result.insertId,
        user_id,
        text,
        media,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// GET all posts
const getAllP = async (req, res) => {
  try {
    const result = await getAllPosts();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// GET by user
const getP = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await getPost(user_id);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};
const getPostsByUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    const result = await getPost(user_id);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// EDIT
const updateP = async (req, res) => {
  try {
    const { text, media } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;

    const row = await updatePost(id, user_id, text, media);

    if (!row) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({
      message: "Post updated",
      result: {
        id,
        user_id,
        text,
        media,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// DELETE
const deleteP = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const row = await deletePost(id, user_id);

    if (!row) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = { createP, getAllP, getP, getPostsByUser, updateP, deleteP };
