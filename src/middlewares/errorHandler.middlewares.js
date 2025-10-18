const { STATUS_CODES } = require("../config/constants.config");

/**
 * Global error handling middleware
 * Catches and formats all errors in the application
*/
function errorHandler (err, req, res, next) {
    const statusCode = err.statusCode || STATUS_CODES.INTERNAL_ERROR;

    res.status(statusCode).json({
        status: 'failed',
        message: err.message || 'Internal Server Error',
        timestamp: new Date().toISOString(),
        // error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

function notFound (req, res, next) {
    res.status(404).json({
        status: 'failed',
        message: `Route not found: ${req.method} ${req.path}`,
        timestamp: new Date().toISOString(),
    });
    // next();
};

module.exports = {
    errorHandler,
    notFound,
};