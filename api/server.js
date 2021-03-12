// BUILD YOUR SERVER HERE
const User = require('./users/model');
const express = require('express');

//express returns an instance of the server
const server = express();
server.use(express.json());
// server.get('/', (req, res) => {
//     res.json({message: 'hello world'})
// })

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    User.find(id)
        .then(user => {
            console.log(user);
            if (!user) {
                res.status(404).json({ message: `user ${id} not found` })
            } else {
                res.json(user)
            }
        })
        .catch(error => {
            res.status(500).json({ error: err.message });
        })
})

server.get('api/users', (req, res) => {
    User.find()
        .then(user => {
            // console.log(user)
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: err.message });
        })
})

server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user"' })
    } else {
        Users.insert({ name: req.body.name, bio: req.body.bio })
            .then((res) => {
                res.status(201).json(res);
            })
            .catch(error => {
                res.status(500).json({ error: err.message });
            })
    }
})

server.put('/api/users/:id', async(req, res) => {
    const { id } = req.params
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({ message: 'Please provide name and bio for the user' })
        } else {
            const updateUser = await Users.update(id, req.body)
            if (!updateUser) {
                res.status(404).json({ message: 'The user with the specified ID does not exist' })
            } else {
                res.json(updateUser)
            }
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

server.delete('/api/users/:id', async(req, res) => {
    try {
        const deleteUser = await User.remove(req.params.id)
        if (!deleteUser) {
            res.status(404).json({ message: 'The user with the specified ID does not exist' })
        } else {
            res.json(deleteUser)
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})



module.exports = { server }; // EXPORT YOUR SERVER instead of {}