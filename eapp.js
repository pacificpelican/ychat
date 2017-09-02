//  ExpressJS startup page for ychat App [LokiJS version] by Dan McKeown http://danmckeown.info
//	ychat.pacificio.com | copyright 2017

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const crypto = require('crypto');

const secret = 'abcdefg';

function getHash(src) {
  const hash = crypto.createHmac('sha256', src)
  .update('I love cupcakes')  // via https://nodejs.org/api/crypto.html
  .digest('hex');
  console.log(src + " hashed is " + hash);
  return hash;
}

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

server.listen(process.env.PORT || 3000, function () {
  console.log('ychat app listening on port 3000');
});

var bodyParser = require('body-parser');
var path = require('path');

var Strategy = require('passport-http').BasicStrategy;
var loki = require('lokijs')
var db = new loki(__dirname + '/users.json')

var passport = require('passport');

io.on('connection', function(socket){
  console.log('a user connected [socketIO]');
});

let userfiles = 'userfiles';

db.loadDatabase({}, function () {
  let _collection = db.getCollection(userfiles);

  if (!_collection) {
    console.log("Collection %s does not exit. Creating ...", userfiles);
      _collection = db.addCollection(userfiles);
  }

  var userList = _collection.where(function(obj) {
    return (obj.sentTime != null);
  });
 // console.log("user list: " +  userList);
  //  var userList = _collection.find({ vYear:'2017' });
});

// MongoClient.connect('mongodb://localhost:27017/testdb', function (err, db) {
//   if (err)  {
//     console.log(err);
//     throw err;
//   }
//   db.collection('testcollection').find().toArray(function (err, result) {
//     if (err) {
//       console.log(err);
//     }
//   });
// });

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
//  console.log('submitted username and userpassword: ' + username + " " + password);
  db.loadDatabase({}, function () {
    let _collection = db.getCollection(userfiles);
  
    if (!_collection) {
      console.log("Collection %s does not exit. Creating ...", userfiles);
        _collection = db.addCollection(userfiles);
    }

 //   var userList = _collection.find( { "username": { $eq: username } } ).toArray(function (err, result) {
    var userList = _collection.find( { "username": { $eq: username } } );
      console.log("userList:");
        console.log(userList);
        var hashedPW = userList[0].userpassword;
        if (userList.length > 0) {
          if (hashedPW == getHash(password)) {
            return cb(null, username);
          }
          else {
          return cb(null, false);
          }
        }
        else {
          return cb(err);
        }
  })
  // MongoClient.connect('mongodb://localhost:27017/testdb', function (err, db) {
  //   if (err)  {
  //     console.log(err);
  //     throw err;
  //   }
  //     db.collection('testcollection').find( { "username": { $eq: username } } ).toArray(function (err, result) {
  //       console.log("result:")
  //         console.log(result)
  //         var hashedPW = result[0].userpassword;
  //         if (result.length > 0) {
  //           if (hashedPW == getHash(password)) {
  //             return cb(null, username);
  //           }
  //           else {
  //           return cb(null, false);
  //           }
  //         }
  //         else {
  //           return cb(err);
  //         }
  //       })
  //     });
    }));

var _user_name = null;

app.use(bodyParser.urlencoded({ extended: true }));
//  app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.get('/', passport.authenticate('basic', { session: false }), (req, res) => {
  console.log("req.user");
  console.log(req.user);
  _user_name = req.user;
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

app.get('/currentusername', passport.authenticate('basic', { session: false }), (req, res) => {
  res.send(_user_name);
});

app.get('/build', express.static('build'));

app.use('/socket.io', express.static('node_modules/socket.io/socket.js'));

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
  var user_pw = getHash(req.body.password);
  console.log(req.body);
  let homeLink = "<a href='../../..'>Home</a>";
  let createdAt = Date.now();

db.loadDatabase({}, function () {
  let _collection = db.getCollection(userfiles);

  if (!_collection) {
      console.log("Collection %s does not exit. Creating ...", userfiles);
      _collection = db.addCollection(userfiles);
    
  }

  _collection.insertOne( {"username" :  user_name, "userpassword": user_pw, "created_at": createdAt});
  //  _collection.insert(actor1);
      
  db.saveDatabase();

  res.send(user_name + ' ' + user_pw + ' created    | ' + homeLink);
});

  // MongoClient.connect('mongodb://localhost:27017/testdb', function (err, db) {
  //   if (err)  {
  //     console.log(err);
  //     throw err;
  //   }
  //   else {
  //     db.collection('testcollection').insertOne( {"username" :  user_name, "userpassword": user_pw, "created_at": createdAt});
  //   }
  //   res.send(user_name + ' ' + user_pw + ' created    | ' + homeLink);
  // });
});

app.use('/static', express.static('build/static'));
