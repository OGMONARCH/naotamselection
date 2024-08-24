const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { setupSocket } = require('./utils/socket');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/authRoutes');
const voteRoutes = require('./routes/voteRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/tokens', tokenRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

module.exports = app;
