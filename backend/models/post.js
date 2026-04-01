const db = require("../config/db");

// CREATE
const createPost = async (user_id, text, media) => {
  try {
    const [result] = await db.query(
      "INSERT INTO `post` (user_id, text, media) VALUES (?,?,?)",
      [user_id, text, media || null],
    );

    return result;
  } catch (err) {
    console.error("Internal server error", err);
    throw err;
  }
};

// GET all posts
const getAllPosts = async () => {
  try {
    const [result] = await db.query(
      `SELECT post.*, user.name, user.avatar 
       FROM post 
       JOIN user ON post.user_id = user.id 
       ORDER BY post.created_at DESC`,
    );

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// GET by user
const getPost = async (user_id) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM `post` WHERE user_id = ? ORDER BY created_at DESC",
      [user_id],
    );

    return result;
  } catch (err) {
    console.error("Internal server error", err);
    throw err;
  }
};

// EDIT
const updatePost = async (id, user_id, text, media) => {
  try {
    const [row] = await db.query(
      "UPDATE `post` SET `text`=?,`media`=? WHERE id = ? AND user_id = ?",
      [text, media, id, user_id],
    );

    if (row.affectedRows === 0) return null;

    return row;
  } catch (err) {
    console.error("Internal server error", err);
    throw err;
  }
};

// DELETE
const deletePost = async (id, user_id) => {
  try {
    const [row] = await db.query(
      "DELETE FROM `post` WHERE id = ? AND user_id = ?",
      [id, user_id],
    );

    if (row.affectedRows === 0) return null;

    return row;
  } catch (err) {
    console.error("Internal server error", err);
    throw err;
  }
};

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost };
