/**
 * Global Error Handling Middleware.
 * This function signature (4 arguments) tells Express it is an error handler.
 * It catches errors passed via next(err) and sends a consistent response.
 */
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging

    // Check if the response has already been sent
    if (res.headersSent) {
        return next(err);
    }

    // Determine status code (default to 500)
    const statusCode = err.statusCode || 500;
    
    // Send a generic, non-specific error message to the client for security
    res.status(statusCode).json({
        status: statusCode,
        message: statusCode === 500 ? 'Internal Server Error' : err.message || 'An unknown error occurred.',
        // In a production environment, you would hide err.message for 500 errors
    });
};