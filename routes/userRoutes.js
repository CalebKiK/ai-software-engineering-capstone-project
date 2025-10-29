const express = require('express');
const router = express.Router();

let users = [
    {id: 1, name: "Caleb", email: "caleb@gmail.com"},
    {id: 2, name: "Anne", email: "anne@gmail.com"},
    {id: 3, name: "Fiona", email: "fiona@gmail.com"},
    {id: 4, name: "David", email: "david@gmail.com"},
];

// let [], {}, ||

router.get('/users', async(req, res) =>  {
    res.status(200).json(users);
});

router.get('/users/:id', async(req, res) =>  {
    const { id } = req.body.params;

    const user = users.filter(user => user.id === id);
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

router.post('/users', async(req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.json({message: "All fields are required"})
    };

    const newUser = {
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

export default router;