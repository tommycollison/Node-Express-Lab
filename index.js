// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();
const PORT = 4000;

server.use(express.json());



// add your server code starting here

console.log('hello world')

server.get('/', (req, res) => {
    res.send(
        'hi there from our regular get function! ~_~'
    )
})

// endpoint shenanigans

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500)
        res.json(`Huh, can't find those posts`)
    })
})


server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(post => {
        if(post) {
            res.json(post);
        } else {
            status(404)
            res.json('Error 404: Idk that post')
        }
    })
    .catch(err => {
        res.status(500)
        res.json('Error 500: Idk that post')
    })
})

// post req

server.post('/api/posts', (req, res) => {
    const user = req.body;
    console.log('post from body:', user)
    db.insert(user).then(user => {
        console.log('post from insert method:', user);
        res.json(user);
    }).catch(err => {
        res
        .status(500)
        .json("Error: failed to add post")
    })
})


// server has to be told to listen

server.listen(PORT, () => {
    console.log(`server is alive on port ${PORT}`);
});