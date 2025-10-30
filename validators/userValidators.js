import { users } from '../data/storage.js'; // Note the .js extension

/**
 * Middleware to validate input fields for creating or updating a user.
 * Checks for name, email presence, and email format.
 */
export const validateUserInput = (req, res, next) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            status: 400,
            message: "Both name and email are required fields."
        });
    }

    // Basic email format check (using a simple regex for demonstration)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid email format."
        });
    }

    next();
};

/**
 * Middleware to check for email uniqueness before creating a new user.
 * This is separated from the general input validation.
 */
export const checkEmailUnique = (req, res, next) => {
    const { email } = req.body;
    
    // Check if the email already exists in the stored users object
    const emailExists = Object.values(users).some(user => user.email === email);

    if (emailExists) {
        return res.status(400).json({
            status: 400,
            message: "Email address is already registered."
        });
    }

    next();
};