const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
  res.send("🏆 World Cup 2026 API is running");
});

// Get all matches
app.get("/api/matches", (req, res) => {
  const data = fs.readFileSync("./matches.json", "utf8");
  res.json(JSON.parse(data));
});

// Get matches by group
app.get("/api/group/:group", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./matches.json", "utf8"));

  const filtered = data.matches.filter(
    m => m.group === "Group " + req.params.group.toUpperCase()
  );

  res.json({ group: req.params.group, matches: filtered });
});

// Get matches by team
app.get("/api/team/:name", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./matches.json", "utf8"));

  const filtered = data.matches.filter(
    m =>
      m.team1.toLowerCase() === req.params.name.toLowerCase() ||
      m.team2.toLowerCase() === req.params.name.toLowerCase()
  );

  res.json({ team: req.params.name, matches: filtered });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
