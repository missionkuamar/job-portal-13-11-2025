const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;


// Middleware setup
const corsOptions = {
  origin: 'https://job-portal-13-11-2025.onrender.com',  // React app is assumed to run on this port
  methods: 'GET, POST, PUT, DELETE',  // Allowed HTTP methods
  // allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
};

app.use(cors(corsOptions));  // Apply CORS configuration
app.use(express.json());

// Define the path to your client build folder
const _dirname = path.resolve();

// API Routes
const apiRoute = require('./routes/api');
app.use('/api', apiRoute);  // This should come first to avoid being caught by the wildcard route

// Serve static files from the 'client/dist' folder
app.use(express.static(path.join(_dirname, 'client', 'dist')));

// Catch-all route to serve index.html for frontend React app (This should be last)
app.use((req, res, next) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
});

// // Handle React routing (this fixes your crash)
// app.use((req, res) => {
//   res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});