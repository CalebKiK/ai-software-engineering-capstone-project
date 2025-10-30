import express from 'express';
// --- CORRECTED IMPORTS (using .js extensions) ---
import { users, transactions } from '../data/storage.js';
import { getNewId } from '../utils/idGenerator.js';
import { validateUserInput, checkEmailUnique } from '../validators/userValidators.js';

const router = express.Router();

// -----------------------------------------------------------
// GET /users - List all users
// -----------------------------------------------------------
router.get('/', (req, res) =>  {
    // Convert the O(1) keyed object into an array for easy consumption
    const allUsers = Object.values(users).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance // Include the current balance
    }));

    res.status(200).json({
        status: 200,
        message: 'Users fetched successfully',
        data: allUsers
    });
});

// -----------------------------------------------------------
// GET /users/:id - Get a single user (using O(1) lookup)
// -----------------------------------------------------------
router.get('/:id', (req, res) =>  {
    // Use req.params.id directly as a string key
    const id = req.params.id;

    // O(1) direct object lookup (fastest way)
    const user = users[id];
    
    if (!user) {
        return res.status(404).json({
            status: 404,
            message: `No user found with id ${id}`
        })
    };

    // Remove sensitive data if needed, but for learning purposes we return all
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        createdAt: user.createdAt
    };

    return res.status(200).json({
        status: 200,
        message: "User found successfully",
        data: userData
    })
});

// -----------------------------------------------------------
// POST /users - Create a new user (Uses Validation Middleware)
// -----------------------------------------------------------
router.post('/', validateUserInput, checkEmailUnique, (req, res) => {
    // Input is guaranteed to be clean and unique by middleware
    const { name, email } = req.body;
    const newId = getNewId(users); // Get ID using the reusable utility

    const newUser = {
        id: newId,
        name: name,
        email: email,
        balance: 0.00, // Initialize new users with zero balance
        createdAt: new Date().toISOString()
    }

    users[newId] = newUser; // Add to the central storage object

    return res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: newUser
    });
});

// -----------------------------------------------------------
// PUT /users/:id - Update an existing user
// -----------------------------------------------------------
router.put('/:id', validateUserInput, (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;

    const user = users[id];
    if (!user) {
        return res.status(404).json({
            status: 404,
            message: `User with id ${id} not found.`
        });
    }

    // Check if the new email already exists for a *different* user
    const emailConflict = Object.values(users).some(u => u.email === email && u.id !== id);
    if (emailConflict) {
        return res.status(400).json({
            status: 400,
            message: "Email already in use by another user."
        });
    }

    // Update the properties
    user.name = name;
    user.email = email;

    return res.status(200).json({
        status: 200,
        message: `User ${id} updated successfully.`,
        data: user
    });
});

// -----------------------------------------------------------
// DELETE /users/:id - Delete a user
// -----------------------------------------------------------
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id];

    if (!user) {
        return res.status(404).json({
            status: 404,
            message: `User with id ${id} not found.`
        });
    }

    // Business Rule: Check if the user has any existing transactions
    const hasTransactions = Object.values(transactions).some(tx => tx.userId === id);

    if (hasTransactions) {
        // Prevent deletion if transactions exist to maintain data integrity
        return res.status(400).json({
            status: 400,
            message: "Cannot delete user: transactions exist for this account. Clear transactions first."
        });
    }

    // Delete from the data store
    delete users[id];

    return res.status(200).json({
        status: 200,
        message: `User ${id} deleted successfully.`
    });
});

export default router;