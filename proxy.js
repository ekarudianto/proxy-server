const express = require('express');
const request = require('request');

const app = express();

// heroku url: https://murmuring-earth-80569-478a80600db5.herokuapp.com/ | git url: https://git.heroku.com/murmuring-earth-80569.git

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST'); // Allow GET and POST requests
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow these headers
  next();
});

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.sendStatus(200); // Respond with 200 OK for OPTIONS requests
});

// Proxy GET requests
app.get('*', (req, res) => {
  const url = 'https://script.google.com' + req.url;
  req.pipe(request(url)).pipe(res);
});

// Proxy POST requests
app.post('*', (req, res) => {
  const url = 'https://script.google.com' + req.url; // Forward the full request path
  req.pipe(request.post(url, { headers: { 'Content-Type': 'application/json' } })).pipe(res);
});

// Start the server
const PORT = process.env.PORT || 3001; // Use the port provided by Heroku or default to 3001
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});

