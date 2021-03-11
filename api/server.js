// BUILD YOUR SERVER HERE
const users = require('./users/model');
const express = require('express');

//express returns an instance of the server
const server = express();

// server.get('/', (req, res) => {
//     res.json({message: 'hello world'})
// })

server.get('/api/users/:id', (req, res) => {
    const id = req.params;
    users.find(id)
        .then(user => {
            console.log(user);
            if (!user) {
                res.status(404).json({ message: `user ${id} not found` })
            } else {
                res.json(user)
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'The user information could not be retrieved', error })
        })
})

server.get('api/users', (req, res) => {
    users.find()
        .then(user => {
            // console.log(user)
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'The user information could not be retrieved', error })
        })
})

server.post('')



module.exports = {}; // EXPORT YOUR SERVER instead of {}