const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Todo } = require('../../models/Todo');
const { User } = require('../../models/User');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'abc@example.com',
    password: 'passwordOne',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'def@example.com',
    password: 'passwordTwo',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: new Date().getTime(),
    _creator: userTwoId
}];

const populateTodos = done => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());  
};

const populateUsers = done => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}