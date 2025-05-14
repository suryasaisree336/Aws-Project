// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const analyzeSentiment = require('./comprehendMock');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_FILE = './backend/db.json';

app.post('/api/feedback', (req, res) => {
  const { feedback } = req.body;
  const sentiment = analyzeSentiment(feedback);

  const entry = { feedback, sentiment };
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  db.push(entry);
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

  res.json(entry);
});

app.get('/api/feedback', (req, res) => {
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  res.json(db);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
