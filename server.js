require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const profileRouter = require('./src/routes/profile.routes');

const app = express();
const PORT = process.env.PORT || 5080;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ==============================
// =======-MIDDLEWARE-===========
// ==============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// =========-ROUTE-==============
// ==============================
app.get('/api', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api', profileRouter); // /me endpoint

// ===============================
// ======-Error Handler-==========
// ===============================


// ==============================
// =========-SERVER-=============
// ==============================
const startServer = async () => {
    try {
        console.log('');
        console.log('='.repeat(50));
        console.log('🚀 Starting Server...');
        console.log('='.repeat(50));
        console.log('');        
        console.log('='.repeat(50));
        console.log("🚀  Dynamic Profile Endpoint - Stage 0 API");
        console.log("=".repeat(50));
        console.log('');
        
        const server = app.listen(PORT, () => {
            console.log('='.repeat(50));
            console.log(`📡 Server running on port ${PORT}`);
            console.log(`🌍 Environment: ${NODE_ENV}`);
            console.log(`🔗 API URL: http://localhost:${PORT}/api`);
            console.log(`📍 Profile Endpoint: http://localhost:${PORT}/api/me`);
            console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
            console.log('='.repeat(50));
            console.log('');

        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('\nSIGINT received. Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('');
        console.error('='.repeat(60));
        console.error('❌ Failed to start server');
        console.error('='.repeat(60));
        console.error('');
        console.error('Error:', error.message);
        console.error('');
        process.exit(1);
    };
};

startServer();