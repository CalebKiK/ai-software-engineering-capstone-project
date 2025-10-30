/**
 * Middleware function to validate the request body for a new transaction (POST).
 * It checks for required fields, type, and amount validity.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const validateTransactionPost = (req, res, next) => {
    const { userId, type, amount, description, category } = req.body;

    // Check for required fields
    if (!userId || !type || !amount || !description || !category) {
        return res.status(400).json({
            status: 400,
            message: "All fields (userId, type, amount, description, category) are required."
        });
    }

    // Check for amount validity
    const transactionAmount = Number(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
        return res.status(400).json({
            status: 400,
            message: "Amount must be a positive number."
        });
    }

    // Check for valid type
    if (type !== 'deposit' && type !== 'withdrawal') {
        return res.status(400).json({
            status: 400,
            message: "Transaction type must be 'deposit' or 'withdrawal'."
        });
    }

    // If validation passes, call next() to move to the route handler
    next();
};

/**
 * Middleware function to validate the request query for transaction history (GET /)
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
export const validateTransactionGet = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            status: 400,
            message: "UserId is required to find transactions."
        });
    }

    // If validation passes, call next()
    next();
};