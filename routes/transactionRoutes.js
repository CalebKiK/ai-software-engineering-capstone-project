import express from 'express';
import { users, transactions} from '../data/storage.js';
import { validateTransactionPost, validateUserTransactionGet } from '../validators/transactionValidators.js';
import { getNewId } from '../utils/idGenerator.js';

const router = express.Router();

// -----------------------------------------------------------
// GET /transactions/balance - Get current user balance (Uses Query Validation)
// -----------------------------------------------------------
router.get('/balance/:id', validateUserTransactionGet, (req, res) => {
    // NOTE: userId presence is guaranteed by validateTransactionGet middleware
    const { userId } = req.params;

    const user = users[userId];
    if (!user) {
        // This check remains because it is business logic (user data integrity), not just input syntax validation
        return res.status(404).json({
            status: 404,
            message: `User with id ${userId} not found.`
        });
    }

    // Return the pre-calculated balance
    return res.status(200).json({
        status: 200,
        message: 'Current balance fetched successfully.',
        data: {
            userId: user.id,
            balance: user.balance
        }
    });
});

// -----------------------------------------------------------
// GET /transactions - Transaction History Endpoint of all users (Uses Query Validation)
// -----------------------------------------------------------
router.get('/', (req, res) => {
    // NOTE: userId presence is guaranteed by validateTransactionGet middleware
    const { type, description, category } = req.query;

    let resultsTransactions = Object.values(transactions);

    if (type) {
        resultsTransactions = resultsTransactions.filter(tx => tx.type === type);
    };

    if (description) {
        // Using includes for partial matching
        resultsTransactions = resultsTransactions.filter(tx => tx.description.toLowerCase().includes(description.toLowerCase()));
    };

    if (category) {
        resultsTransactions = resultsTransactions.filter(tx => tx.category === category);
    };

    if (resultsTransactions.length === 0) {
        // Using 200 OK since the request was valid, but no data matched the filter
        return res.status(200).json({
            status: 200,
            message: 'No results found with the provided filters',
            data: []
        })
    }

    resultsTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
        status: 200,
        message: 'Results found successfully',
        data: resultsTransactions
    })
});

// -----------------------------------------------------------
// GET /transactions per user - Transaction History Endpoint for a user (Uses Query Validation)
// -----------------------------------------------------------
router.get('/user/:id', validateUserTransactionGet, (req, res) => {
    // NOTE: userId presence is guaranteed by validateTransactionGet middleware
    const { id } = parseInt(req.params);
    const { type, description, category } = req.query;

    if (!users[id]) {
        return res.status(404).json({
            status: 404,
            message: `User with id ${id} not found.`
        })
    };

    let resultsTransactions = Object.values(transactions)
        .filter(tx => tx.userId === id);

    if (type) {
        resultsTransactions = resultsTransactions.filter(tx => tx.type === type);
    };

    if (description) {
        // Using includes for partial matching
        resultsTransactions = resultsTransactions.filter(tx => tx.description.toLowerCase().includes(description.toLowerCase()));
    };

    if (category) {
        resultsTransactions = resultsTransactions.filter(tx => tx.category === category);
    };

    if (resultsTransactions.length === 0) {
        // Using 200 OK since the request was valid, but no data matched the filter
        return res.status(200).json({
            status: 200,
            message: 'No results found with the provided filters',
            data: []
        })
    }

    resultsTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
        status: 200,
        message: 'Results found successfully',
        data: resultsTransactions
    })
});

// -----------------------------------------------------------
// POST /transactions - Create a new deposit or withdrawal (Uses Body Validation)
// -----------------------------------------------------------
router.post('/', validateTransactionPost, (req, res) => {
    // NOTE: Input data structure, types, and required fields are guaranteed by validateTransactionPost middleware
    const { userId, type, amount, description, category } = req.body;
    const transactionAmount = Number(amount); // Conversion is safe here due to middleware check

    const user = users[userId];
    if (!user) {
        return res.status(404).json({
            status: 404,
            message: `User with id ${userId} not found.`
        });
    };

    // Balance Check for Withdrawal (BUSINESS LOGIC REMAINS HERE)
    if (type === 'withdrawal' && user.balance < transactionAmount) {
        return res.status(400).json({
            status: 400,
            message: "Insufficient funds for this withdrawal."
        });
    }

    const newId = getNewId(transactions);

    const newTransaction = {
        id: newId,
        userId: userId,
        type: type, 
        amount: transactionAmount, // Use the converted number
        description: description,
        category: category,
        createdAt: new Date().toISOString()
    };

    transactions[newId] = newTransaction;

    // Update user balance
    if (type === 'deposit') {
        user.balance += transactionAmount;
    } else if (type === 'withdrawal') {
        user.balance -= transactionAmount;
    };

    return res.status(201).json({
        status: 201,
        message: "Transaction created successfully",
        data: newTransaction,
        newBalance: user.balance
    })
});

// -----------------------------------------------------------
// DELETE /transactions/:id - Delete transaction and reverse balance
// -----------------------------------------------------------
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // 1. Check if transaction exists (O(1) lookup)
    const transaction = transactions[id];
    if (!transaction) {
        return res.status(404).json({
            status: 404,
            message: `Transaction with id ${id} not found.`
        });
    }
    
    // 2. Check if user exists (safe check)
    const user = users[transaction.userId];
    if (!user) {
        return res.status(500).json({ 
            status: 500,
            message: "Associated user not found, cannot safely delete transaction."
        });
    }

    const { type, amount } = transaction;

    // 3. Reverse the balance change
    if (type === 'deposit') {
        user.balance -= amount;
    } else if (type === 'withdrawal') {
        user.balance += amount;
    }

    // 4. Delete from data store
    delete transactions[id];

    // 5. Success Response
    return res.status(200).json({
        status: 200,
        message: `Transaction ${id} deleted and balance reversed successfully.`,
        newBalance: user.balance
    });
});


// -----------------------------------------------------------
// GET /transactions/:id - Get single transaction
// -----------------------------------------------------------
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const transaction = transactions[id];

    if (!transaction) {
        return res.status(404).json({
            status: 404,
            message: `Transaction with id ${id} not found.`
        });
    }

    return res.status(200).json({
        status: 200,
        message: 'Transaction found successfully.',
        data: transaction
    });
});

export default router;