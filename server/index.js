require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const { cloudinaryConnect } = require('./utils/cloudinaryUpload');
const fs = require('fs');
const path = require('path');

const donationRoutes = require('./routes/donationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, 'tmp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Configure CORS with specific origins
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://basava-parishath-bengaluru-website.vercel.app',
    /https:\/\/basava-parishath-bengaluru-website.*\.vercel\.app$/
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Origin:', req.get('Origin'));
  next();
});

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/',
    limits: { fileSize: 9 * 1024 * 1024 },
  })
);

// Connect to MongoDB
connectDB();

cloudinaryConnect();

app.get('/', (req, res) => {
  res.json({
    message: 'Server is running with CORS enabled!',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount routes
app.use('/', donationRoutes); // POST /create-order, /save-donation
app.use('/contact', contactRoutes); // POST /contact
app.use('/events', eventRoutes); // CRUD for events
app.use('/users', userRoutes); // signup, login
app.use('/team', teamRoutes); // CRUD for team members
app.use('/api/registrations', registrationRoutes); // registration routes

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// Configure server timeouts for Render deployment
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Server bound to 0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Set server timeouts to prevent 502 errors on Render
server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds
