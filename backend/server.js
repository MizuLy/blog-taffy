const express = require("express");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const cors = require("cors");

const app = express();
const PORT = 8880;

// Middleware
app.use(express.json());
app.use(cors());

// Auth
app.use("/api/auth", authRouter);

// Taffy
app.use("/api/post", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
