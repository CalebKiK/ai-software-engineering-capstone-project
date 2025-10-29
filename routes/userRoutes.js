// This file is mainly for learning purposes
const express = require('express');
const router = express.Router();

let users = [
    {id: 1, name: "Caleb", email: "caleb@gmail.com"},
    {id: 2, name: "Anne", email: "anne@gmail.com"},
    {id: 3, name: "Fiona", email: "fiona@gmail.com"},
    {id: 4, name: "David", email: "david@gmail.com"},
];

// let [], {}, ||

router.get('/users', (req, res) =>  {
    res.status(200).json(users);
});

router.get('/users/:id', (req, res) =>  {
    const { id } = parseInt(req.params.id);

    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({
            status: 404,
            message: `No users found with id ${id}`
        })
    };

    return res.status(200).json({
        status: 200,
        message: "User found successfully",
        data: user
    })
});

router.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.json({message: "All fields are required"})
    };

    const newId = users.length + 1;

    const emailExists = users.find(users => users.email === email);
    if (emailExists) {
        return res.status(400).json({
            status: 400,
            message: "Email already exists"
        })
    };

    const newUser = {
        id: newId,
        name: req.body.name,
        email: req.body.email
    }

    users.push(newUser);

    return res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: newUser
    });
});

module.exports = router;