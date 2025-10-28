const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
   res.json({ 
      message: 'Finance Tracker API is running',
      version: '1.0.0'
   });
});

// Start server
app.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}`);
});
