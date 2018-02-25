const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/Todo');
const { User } = require('./models/User');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.send(doc);
    }).catch(e => res.status(400).send(e));
});

app.get('/todos', (req, res) => {
    Todo.find()
        .then(todos => res.send({todos}))
        .catch(e => res.status(400).send(e));
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    let { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then(todo => {
        if (!todo) return res.status(404).send();

        res.send({todo});
    }).catch(e => res.status(400).send(e));
});

app.listen(3000, () => console.log('Started on port 3000'));

module.exports = {
    app
};