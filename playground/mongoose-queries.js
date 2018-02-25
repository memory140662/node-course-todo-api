const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/Todo');
const { User } = require('../server/models/User');

// let id = '5a92ce784bfeaad0667e9f9f';
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then(todos => {
//     console.log('Todos', todos);
// }).catch(e => console.log(e));

// Todo.findOne({
//     _id: id
// }).then(todo => {
//     console.log('Todo', todo);
// }).catch(e => console.log(e));

// Todo.findById(id)
//     .then(todo => console.log('Todo By Id', todo))
//     .catch(e => console.log(e));

User.findById('5a926ad824960da05d34c5ff')
    .then(user => {
        if (!user) return console.log('Unable to find user');
        console.log(JSON.stringify(user, undefined, 2));
    })
    .catch(e => console.log(e));

