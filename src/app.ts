// Use node variables
require('dotenv').config(); // Use node variables
require('./config/db'); // Connect to database
import express from 'express';
import bodyParser from 'body-parser';

// Initialize app
const app: any = express();

// Inits Middleware
app.use(bodyParser.json());

// Routes
const userRouters = require('./routes/api/user');
const authRouters = require('./routes/api/auth');

// Use Routes
app.use('/api/user', userRouters);
app.use('/api/auth', authRouters);

// Initiate Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running at port ' + PORT);
});
