//  ExpressJS startup page for ychat App by Dan McKeown http://danmckeown.info

const express = require('express');
const app = express();

var bodyParser = require('body-parser');

var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
//  app.use( bodyParser.json() );       // to support JSON-encoded bodies

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/testdb', function (err, db) {
  if (err)  {
    console.log(err);
    throw err;
  }
  db.collection('testcollection').insertOne( {"username" :  "x", "password": "y"});
  db.collection('testcollection').find().toArray(function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname + '/register.html'));
});

app.post('/process/register', (req, res) => {
  var user_name = req.body.login;
  var user_pw = req.body.password;
  console.log(req.body);
  res.send(user_name + ' ' + user_pw);
});

app.use('/static', express.static('build/static'));

app.listen(3000, function () {
  console.log('ychat app listening on port 3000');
});
