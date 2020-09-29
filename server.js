const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('./config/config');


let app = express();
let db;

const uri = config.uri;
//const uri = 'mongodb+srv://niyak:byt456UN@users-api.w3jjo.mongodb.net/usersAPI?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Welcome!");
});

app.get('/users', (req, res) => {
  db.collection('users').find().toArray(( err, users) => {
    if (err) {
      console.log('Error:', err);
      return res.sendStatus(500);
    }
    res.send(users);
  });
});

app.post('/users', (req, res) => {
  let user = {
    login: req.body.login,
    username: req.body.username
  }

  db.collection('users').insert(user, (err, result) => {
    if (err) {
      console.log('Error:', err);
      return res.sendStatus(500);
    }
    res.send(user);
  });
  console.log(user);
});

app.get('/users/:id', (req, res) => {
  db.collection('users').findOne({ '_id': ObjectID(req.params.id) }, (err, user) => {
    if (err) {
      console.log('Error:', err);
      return res.sendStatus(500);
    }
    res.send(user);
  })
});

app.put('/users/:id', (req, res) => {
  db.collection('users').updateOne(
    { '_id': ObjectID(req.params.id) },
    [
      { $set: { 'username': req.body.username, 'login': req.body.login } },
    ],
    (err) => {
      if (err) {
        console.log('Error:', err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  )
});

app.delete('/users/:id', (req, res) => {
  db.collection('users').deleteOne(
    { '_id': ObjectID(req.params.id) },
    (err) => {
      if (err) {
        console.log('Error:', err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  )
});


client.connect(err => {
  if (err) {
    console.log(err);
    return 0;
  }
  
  db = client.db('usersAPI');

  app.listen(3000, () => {
    console.log('Server started.');
  });

  //client.close();
});
