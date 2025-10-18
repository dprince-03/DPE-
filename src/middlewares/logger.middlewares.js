/**
 * Request logging middleware
 * Logs incoming requests with timestamp, method, and path
 */
function requestLogger(req, res, next) {
	const timestamp = new Date().toISOString();
	const method = req.method;
	const path = req.path;
	const ip = req.ip || req.connection.remoteAddress;

	console.log(`[${timestamp}] ${method} ${path} - IP: ${ip}`);

	// Log response time
	const startTime = Date.now();

	// Override res.json to log response status
	const originalJson = res.json;
	res.json = function (data) {
		const duration = Date.now() - startTime;
		console.log(
			`[${timestamp}] ${method} ${path} - ${res.statusCode} - ${duration}ms`
		);
		return originalJson.call(this, data);
	};

	next();
}

/**
 * Error logging middleware
 * Logs errors that occur during request processing
 */
function errorLogger(err, req, res, next) {
	const timestamp = new Date().toISOString();
	console.error(`[${timestamp}] ERROR:`, {
		message: err.message,
		stack: err.stack,
		path: req.path,
		method: req.method,
	});
	next(err);
}

module.exports = {
	requestLogger,
	errorLogger,
};
