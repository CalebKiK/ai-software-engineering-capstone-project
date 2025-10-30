import express from 'express';
// Import the routes file
import transactionRouter from './routes/transactionRoutes.js';
// Import the global error handler middleware
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = 3000;

// -------------------------------------------------
// 1. Core Middleware
// -------------------------------------------------
// Middleware to parse JSON bodies (MANDATORY for POST requests)
app.use(express.json());

// -------------------------------------------------
// 2. Test Route
// -------------------------------------------------

// -------------------------------------------------
// 3. Application Routes
// Attach the imported transaction routes under the '/api/transactions' base path
// -------------------------------------------------
app.use('/api/transactions', transactionRouter);


// -------------------------------------------------
// 4. 404 Not Found Handler (Must come AFTER all valid routes)
// This catches requests that made it past all defined routes
// -------------------------------------------------
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: `Resource not found at ${req.originalUrl}`
    });
});

// -------------------------------------------------
// 5. Global Error Handler (Must be the LAST middleware added)
// This catches all errors passed by next(err)
// -------------------------------------------------
app.use(errorHandler);


// -------------------------------------------------
// 6. Start Server
// -------------------------------------------------
app.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}`);
});
