const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Middleware to parse JSON requests
app.use(express.json());

// Sample in-memory leaderboard (replace with database logic later)
let leaderboard = [
  { player: "Alice", score: 150 },
  { player: "Bob", score: 200 }
];

// Root endpoint
app.get("/", (req, res) => {
  res.send("Minesweeper game server is running!");
});

// GET /score - Retrieve leaderboard data
app.get("/score", (req, res) => {
  res.json(leaderboard);
});

// POST /play - Submit a new score
app.post("/play", (req, res) => {
  const { player, score } = req.body;
  if (!player || !score) {
    return res.status(400).json({ error: "Player name and score are required" });
  }

  leaderboard.push({ player, score });
  res.status(201).json({ message: "Score added", leaderboard });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

