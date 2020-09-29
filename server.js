const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
  {
    id: 1,
    login: 'niyak4',
    username: 'Ka4a'
  },
  {
    id: 2,
    login: 'konyaka083',
    username: 'Scarecrow'
  },
  {
    id: 3,
    login: 'sinokoss',
    username: 'vvlvchk'
  }
];

app.get('/', (req, res) => {
  res.send("Welcome!");
});

app.get('/users', (req, res) => {
  res.send(users);
  console.log(users);
});

app.post('/users', (req, res) => {
  let user = {
    id: Date.now(),
    login: req.body.login,
    username: req.body.username
  }
  users.push(user);
  res.send(user);
  console.log(user);
});

app.get('/users/:id', (req, res) => {
  let user = users.find((user) => {
    return user.id === Number(req.params.id);
  });
  res.send(user);
  console.log(user);
});

app.put('/users/:id', (req, res) => {
  let user = users.find((user) => {
    return user.id === Number(req.params.id);
  });
  user.username = req.body.username;
  res.sendStatus(200);
});

app.delete('/users/:id', (req, res) => {
  users = users.filter((user) => {
    return user.id !== Number(req.params.id);
  })
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server started.");
});
