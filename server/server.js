require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/Todo');
const { User } = require('./models/User');

const app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
    let { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then(todo => {
        if (!todo) return res.status(404).send();

        res.send({todo});
    }).catch(e => res.status(400).send(e));
});

app.patch('/todos/:id', (req, res) => {
    let { id } = req.params;
    let body = _.pick(req.body, ['text', 'completed']); 

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new :true
    }).then(todo => {
        if (!todo) return res.status(404).end();

        res.send({todo});
    }).catch(e => res.status(400).send());
});

app.listen(port, () => console.log('Started up at port', port));

module.exports = {
    app
};