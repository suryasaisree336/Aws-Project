const express = require("express");
const cors = require("cors");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const Sentiment = require("sentiment");

const app = express();
app.use(cors());
app.use(express.json());

const sentiment = new Sentiment();
const adapter = new FileSync("db.json");
const db = low(adapter);

// Initialize db with default structure
db.defaults({ feedback: [] }).write();

app.post("/submit", (req, res) => {
  const { text } = req.body;
  const result = sentiment.analyze(text);

  const entry = {
    id: Date.now(),
    text,
    sentiment: result.score > 0 ? "Positive" : result.score < 0 ? "Negative" : "Neutral",
    createdAt: new Date().toISOString(),
  };

  db.get("feedback").push(entry).write();
  res.json({ message: "Feedback saved", entry });
});

app.get("/feedback", (req, res) => {
  const feedback = db.get("feedback").value();
  res.json(feedback);
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
