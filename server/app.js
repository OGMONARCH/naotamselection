require('dotenv').config(); // Load environment variables

const express = require('express');
const app = express();
const adminRoute = require('./routes/adminRoute');
const authRoute = require('./routes/authRoute');
const voteRoute = require('./routes/voteRoute');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authMiddleware = require('./middleware/authMiddleware');

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes setup
app.use('/api/auth', authRoute); // Authentication routes
app.use('/api/admin', adminRoute); // Admin routes
app.use('/api/vote', authMiddleware.verifyToken, voteRoute); // Voting routes protected by JWT

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io
const io = socketIo(server, {
  cors: {
      origin: '*', // Allow all origins
      methods: ["GET", "POST"], // Allow GET and POST methods
      credentials: true 
  }
});


// Broadcast vote updates function
const broadcastVoteUpdate = (voteData) => {
    io.emit('voteUpdate', voteData); // Emit vote updates to all connected clients
};


// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export broadcast function for use in vote route or controllers
module.exports = { broadcastVoteUpdate };


