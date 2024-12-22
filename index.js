const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle CORS with detailed configuration
app.use(
  cors({
    origin: '*', // Adjust this to your frontend domain for better security
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  })
);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory storage for demonstration purposes
const locationData = [];

// Endpoint to handle location data
app.post('/', (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Validate latitude and longitude
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
    }

    // Process the location data
    console.log('Received location data:', { latitude, longitude });

    // Store in in-memory array
    locationData.push({ latitude, longitude, timestamp: Date.now() });

    res.status(200).json({ message: 'Location data received successfully' });
  } catch (error) {
    console.error('Error processing location data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to retrieve all stored location data
app.get('/locations', (req, res) => {
  res.status(200).json(locationData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
