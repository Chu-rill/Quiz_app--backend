const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/auth_routes");
const quizRoutes = require("./src/routes/quiz_routes");
const leaderboardRoutes = require("./src/routes/leaderboard_routes");
const dotenv = require("dotenv").config();
const { connectDB } = require("./src/utils/db");
const rateLimit = require("express-rate-limit");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up the rate limiter to allow 50 requests per minute (windowMs = 1 minute, max = 50)
let limiter = rateLimit({
  max: 50, // 50 requests
  windowMs: 60 * 1000, // 1 minute
  message:
    "We have received too many requests from this IP. Please try again after one minute.",
});

// Apply the rate limiter to all routes
app.use(limiter);

app.get("/", async (req, res) => {
  res.json({ success: true, message: "Backend Connected Successfully" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/leaderboard", leaderboardRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  // Connect to the database
  connectDB();
});
