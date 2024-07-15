const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve HTML UI
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint to fetch all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await db.getAllItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to add a new item
app.post('/api/items', async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  try {
    const itemId = await db.addItem(name, description);
    res.json({ id: itemId, name, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
