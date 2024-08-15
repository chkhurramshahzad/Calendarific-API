const express = require('express');
const holidaysRoutes = require('./routes/holidays');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Use the routes
app.use('/api', holidaysRoutes);

// Start the server
app.listen(port, () => {
    console.log("Server running at http://localhost:${port}");
});