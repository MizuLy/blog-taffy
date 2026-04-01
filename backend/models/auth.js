const db = require("../config/db");
const bcrypt = require("bcrypt");

// REGISTER
const register = async (name, email, avatar, password) => {
  try {
    const [existing] = await db.query("SELECT * FROM `user` WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) return false;

    // Take password to hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO `user` (name, email, avatar, password) VALUES (?,?,?,?)",
      [name, email, avatar, hashedPassword],
    );

    return result;
  } catch (err) {
    console.error("Server error", err);
    throw err;
  }
};

// Login
const login = async (email, password) => {
  try {
    const [result] = await db.query("SELECT * FROM `user` WHERE email = ?", [
      email,
    ]);

    if (result.length === 0) return null;

    // get the first user?
    const user = result[0];

    // Compare password to the password that user put in
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return false;

    return user;
  } catch (err) {
    console.error("Server error", err);
    throw err;
  }
};

// All users
const allUsers = async () => {
  try {
    const [result] = await db.query("SELECT * FROM `user`");

    return result;
  } catch (err) {
    console.error("Server error", err);
    throw err;
  }
};

// User by ID
const userID = async (id) => {
  try {
    const [row] = await db.query("SELECT * FROM `user` WHERE id = ?", [id]);

    if (row.length === 0) return null;

    return row[0];
  } catch (err) {
    throw err;
  }
};

// Current user
const currentUser = async (id) => {
  try {
    const [result] = await db.query(
      "SELECT id, name, email, avatar, created_at FROM `user` WHERE id = ?",
      [id],
    );

    if (result.length === 0) return null;

    return result[0];
  } catch (err) {
    console.error("Server error", err);
    throw err;
  }
};

// Update User Profile
const updateUser = async (id, name, avatar) => {
  try {
    const [result] = await db.query(
      "UPDATE `user` SET name = COALESCE(NULLIF(?, ''), name), avatar = COALESCE(NULLIF(?, ''), avatar) WHERE id = ?",
      [name, avatar, id],
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// Update User Account
// const updateAccount = async (id, email, currentPassword, newPassword) => {
//   try {
//     // Fetch current user
//     const [rows] = await db.query("SELECT * FROM `user` WHERE id = ?", [id]);
//     const user = rows[0];

//     // Compare password with the password user input
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return false

//     // Hash password
//     const hashed = await bcrypt.hash(newPassword, 10);

//     const [result] = await db.query(
//       "UPDATE `user` SET email = COALESCE(NULLIF(?, ''), email), password = ? WHERE id = ?",
//       [email, hashed, id],
//     );

//     return result;
//   } catch (err) {
//     throw err;
//   }
// };

// Update email
const updateEmail = async (id, email) => {
  try {
    const [isExist] = await db.query("SELECT * FROM `user` WHERE email = ?", [
      email,
    ]);
    if (isExist.length > 0) return false;

    const [result] = await db.query(
      "UPDATE `user` SET email = ? WHERE id = ?",
      [email, id],
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// Update password
const updatePassword = async (id, currentPassword, newPassword) => {
  try {
    // Fetch current user
    const [rows] = await db.query("SELECT * FROM `user` WHERE id = ?", [id]);
    const user = rows[0];

    // Compare password with the password user input
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return false;

    // Hash password
    const hashed = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(
      "UPDATE `user` SET password = ? WHERE id = ?",
      [hashed, id],
    );

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  register,
  login,
  allUsers,
  userID,
  currentUser,
  updateUser,
  updateEmail,
  updatePassword,
};
