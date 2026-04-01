const jwt = require("jsonwebtoken");
const {
  register,
  login,
  currentUser,
  allUsers,
  updateUser,
  updateEmail,
  updatePassword,
  userID,
} = require("../models/auth");

// Register
const registerController = async (req, res) => {
  try {
    const { name, email, avatar, password } = req.body;

    const result = await register(name, email, avatar, password);

    if (result === false)
      return res.status(400).json({ message: "Email already registered" });

    res.status(201).json({ message: "Register success" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await login(email, password);

    if (result === null)
      return res.status(404).json({ message: "User not found" });
    if (result === false)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login success",
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
      },
      token,
    });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

// All users
const AllUsersController = async (req, res) => {
  try {
    const result = await allUsers();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// user ID
const userIDController = async (req, res) => {
  try {
    const { id } = req.params;

    const row = await userID(id);

    if (!row) return res.status(404).json({ message: "User not found" });

    res.status(200).json(row);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Current user
const currentUserController = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await currentUser(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Update User Profile
const updateUserController = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const id = req.user.id;

    const user = await updateUser(id, name, avatar);

    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Update User Account
// const updateUserAccountController = async (req, res) => {
//   try {
//     const id = req.user.id;
//     const { email, currentPassword, newPassword } = req.body;

//     const result = await updateAccount(id, email, currentPassword, newPassword);

//     if (result === false)
//       return res.status(400).json({ message: "Incorrect current password" });

//     res.status(200).json({ message: "Updated successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error", err });
//   }
// };

// Update user email
const updateEmailController = async (req, res) => {
  try {
    const id = req.user.id;
    const { email } = req.body;

    const result = await updateEmail(id, email);

    if (result === false)
      return res.status(400).json({ message: "Email already existed" });

    res.status(200).json({ message: "Email updated" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Update user password
const updatePasswordController = async (req, res) => {
  try {
    const id = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const result = await updatePassword(id, currentPassword, newPassword);

    if (result === false)
      return res.status(400).json({ message: "Incorrect current password" });

    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
  registerController,
  loginController,
  AllUsersController,
  userIDController,
  currentUserController,
  updateUserController,
  updateEmailController,
  updatePasswordController,
};
