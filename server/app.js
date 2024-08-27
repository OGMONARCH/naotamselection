require('dotenv').config(); // Load environment variables

const express = require('express');
const app = express();
const adminRoute = require('./Routes/adminRoute');
const authRoute = require('./Routes/authRoute');
const voteRoute = require('./Routes/voteRoute');


const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authMiddleware = require('./middleware/authMiddleware');


// Use the middleware on specific routes
app.use('/api/admin', adminRoute);
app.use('/api/vote', authMiddleware.verifyToken, voteRoute);


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', authRoute);
app.use('/api/vote', voteRoute);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


// Create HTTP server
const server = http.createServer(app);


// Initialize socket.io
const io = socketIo(server);

// Broadcast vote updates
const broadcastVoteUpdate = (voteData) => {
  io.emit('voteUpdate', voteData);
};

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { broadcastVoteUpdate };
