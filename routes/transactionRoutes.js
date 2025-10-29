import express from 'express';
const router = express.Router();

const transactions = [];
// type: 'deposit',                
//     amount: 500.00,
//     description: 'Monthly salary',
//     category: 'income',

router.get('/', (req, res) => {
    const { userId, type, description, category } = req.query;

    let resultsTransactions = Object.values(transactions);
    
    if (!userId) {
        return res.status(400).json({
            status: 400,
            message: "UserId is required to find transactions"
        })
    };

    resultsTransactions = resultsTransactions.filter(resultsTransactions => resultsTransactions.userId === userId);

    if (resultsTransactions.length === 0) {
        return res.status(404).json({
            status: 404,
            message: `No results found. Either user with user id ${userId} does not exist or no transactions made yet by the user.`
        })
    };

    if (type) {
        resultsTransactions = resultsTransactions.filter(resultsTransactions => resultsTransactions.type === type);
    };

    if (description) {
        resultsTransactions = resultsTransactions.filter(resultsTransactions => resultsTransactions.description === description);
    };

    if (category) {
        resultsTransactions = resultsTransactions.filter(resultsTransactions => resultsTransactions.category === category);
    };

    if (resultsTransactions.length === 0) {
        return res.status(404).json({
            status: 404,
            message: 'No results found with the provided filters'
        })
    }

    return res.status(200).json({
        status: 200,
        message: 'Results found successfully',
        data: resultsTransactions
    })
});

router.post('/', (req, res) => {
    const { userId, type, amount, description, category } = req.body;

    let resultsUsers = Object.values(users);
    let resultsTransactions = Object.values(transactions);

    if (!userId || !type || !amount || !description || !category) {
        return res.status(400).json({
            status: 400,
            message: "All fields are required to create a new transaction"
        })
    };

    resultsUsers = resultsUsers.filter(resultsUsers => resultsUsers.userId === userId);

    if (resultsUsers.length === 0) {
        return res.status(404).json({
            status: 404,
            message: `No user found with id ${userId}.`
        })
    };

    newId = resultsTransactions.length + 1;

    const newTransaction = {
        id: newId,
        userId: req.body.userId,
        type: req.body.type, 
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,             
        createdAt: Date.now()
    };

    resultsUsers.push(newTransaction);

    return res.status(201).json({
        status: 201,
        message: "Transaction created successfully",
        data: newTransaction
    })

});