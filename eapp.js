//  ExpressJS startup page for ychat App by Dan McKeown http://danmckeown.info
//	ychat.pacificio.com | copyright 2017

const express = require('express');
const app = express();

var bodyParser = require('body-parser');

var path = require('path');

var Strategy = require('passport-http').BasicStrategy;

var MongoClient = require('mongodb').MongoClient;

var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

MongoClient.connect('mongodb://localhost:27017/testdb', function (err, db) {
  if (err)  {
    console.log(err);
    throw err;
  }
  //  db.collection('testcollection').insertOne( {"username" :  "x", "password": "y"});
  db.collection('testcollection').find().toArray(function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
    }
  });
});

// Configure the Basic strategy for use by Passport.
//
// The Basic strategy requires a `verify` function which receives the
// credentials (`username` and `password`) contained in the request.  The
// function must verify that the password is correct and then invoke `cb` with
// a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy(
  function(username, password, cb) {
//    db.users.findByUsername(username, function(err, user) {
  console.log('submitted username and userpassword: ' + username + " " + password);
MongoClient.connect('mongodb://localhost:27017/testdb', function (err, db) {
  if (err)  {
    console.log(err);
    throw err;
  }
    db.collection('testcollection').find( { "username": { $eq: username } } ).toArray(function (err, result) {
      //  if (err) throw err
      console.log("result:")
        console.log(result)
        if (result.length > 0) {
          if (result[0].userpassword == password) {
            return cb(null, username);
          }
        }
        else {
          return cb(err);
       //  return null;
        }
      })

 //     db.inventory.find( { qty: { $eq: 20 } } )

      // if (err) { return cb(err); }
      // if (!user) { return cb(null, false); }
      // if (user.password != password) { return cb(null, false); }
      // console.log("user:");
      // console.log(user);
      // return cb(null, user);
    });
  }));

var _user_name = null;

app.use(bodyParser.urlencoded({ extended: true }));
//  app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.get('/', passport.authenticate('basic', { session: false }), (req, res) => {
  console.log("req.user");
  console.log(req.user);
  _user_name = req.user;
//  res.sendFile(path.resolve(__dirname + '/build/index.html'));
 // res.redirect('/build/index.html?username=' + req.user);
 res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

app.get('/currentusername', passport.authenticate('basic', { session: false }), (req, res) => {
  res.send(_user_name);
});

app.use('/build', passport.authenticate('basic', { session: false }), express.static('build'));

app.get('/info/:username', passport.authenticate('basic', { session: false }), function (req, res) {
  res.send(req.params)
})

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/build/service-worker.js'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname + '/register.html'));
});

app.post('/process/register', (req, res) => {
  var user_name = req.body.login;
  var user_pw = req.body.password;
  console.log(req.body);
  let homeLink = "<a href='../../..'>Home</a>";
  let createdAt = Date.now();

  MongoClient.connect('mongodb://localhost:27017/testdb', function (err, db) {
    if (err)  {
      console.log(err);
      throw err;
    }
    else {
      db.collection('testcollection').insertOne( {"username" :  user_name, "userpassword": user_pw, "created_at": createdAt});
    }
    res.send(user_name + ' ' + user_pw + ' created    | ' + homeLink);
  });
});

app.use('/static', express.static('build/static'));

app.listen(3000, function () {
  console.log('ychat app listening on port 3000');
});
