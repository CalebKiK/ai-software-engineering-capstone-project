import express from 'express';
import { users, transactions} from '../data/storage';
const router = express.Router();

function getNewId(dataObject) {
    // Get all current numeric keys, convert to numbers, find max, and add 1
    const keys = Object.keys(dataObject);
    const maxId = keys.length > 0 ? Math.max(...keys.map(Number)) : 0;
    return String(maxId + 1);
}

router.get('/', (req, res) => {
    const { userId, type, description, category } = req.query;
    
    if (!userId) {
        return res.status(400).json({
            status: 400,
            message: "UserId is required to find transactions"
        })
    };

    if (!users[userId]) {
        return res.status(404).json({
            status: 404,
            message: `User with id ${userId} not found.`
        })
    };

    let resultsTransactions = Object.values(transactions)
        .filter(tx => tx.userId === userId);

    if (type) {
        resultsTransactions = resultsTransactions.filter(tx => tx.type === type);
    };

    if (description) {
        resultsTransactions = resultsTransactions.filter(tx => tx.description === description);
    };

    if (category) {
        resultsTransactions = resultsTransactions.filter(tx => tx.category === category);
    };

    if (resultsTransactions.length === 0) {
        return res.status(404).json({
            status: 404,
            message: 'No results found with the provided filters'
        })
    }

    resultsTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
        status: 200,
        message: 'Results found successfully',
        data: resultsTransactions
    })
});

router.post('/', (req, res) => {
    const { userId, type, amount, description, category } = req.body;

    if (!userId || !type || !amount || !description || !category) {
        return res.status(400).json({
            status: 400,
            message: "All fields are required to create a new transaction"
        })
    };

    const transactionAmount = Number(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
        return res.status(400).json({
            status: 400,
            message: "Amount must be a positive number."
        });
    }

    const user = users[userId];
    if (!user) {
        return res.status(404).json({
            status: 404,
            message: `User with id ${userId} not found.`
        });
    };

    // 3. Validate transaction type
    if (type !== 'deposit' && type !== 'withdrawal') {
        return res.status(400).json({
            status: 400,
            message: "Transaction type must be 'deposit' or 'withdrawal'."
        });
    }

    // 4. Balance Check for Withdrawal
    if (type === 'withdrawal' && user.balance < transactionAmount) {
        // Business logic error
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
        amount: amount,
        description: description,
        category: category,             
        createdAt: new Date().toISOString()
    };

    transactions[newId] = newTransaction;

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

export default router;