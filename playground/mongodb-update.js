// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a925c729f9ab965e3421bff')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then(res => {
    //     console.log(res);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a9256419f9ab965e3421a42')
    }, {
        $set: {
            name: 'Zhu'
        },
        $inc: {
            age: - 1
        }
    }, {
        returnOriginal: false
    }).then(res => {
        console.log(res);
    });

    // client.close();
});