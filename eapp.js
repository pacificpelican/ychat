//  ExpressJS startup page for ychat App [LokiJS version] by Dan McKeown http://danmckeown.info
//	ychat.pacificio.com | copyright 2017

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

const crypto = require("crypto");

const secret = "abcdefg";

function getHash(src) {
  const hash = crypto
    .createHmac("sha256", src)
    .update("I love cupcakes") // via https://nodejs.org/api/crypto.html
    .digest("hex");
  console.log(src + " hashed is " + hash);
  return hash;
}

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
});

server.listen(process.env.PORT || 3000, function() {
  console.log("ychat app listening on port 3000 or " + process.env.PORT);
});

var bodyParser = require("body-parser");
var path = require("path");

var Strategy = require("passport-http").BasicStrategy;
var loki = require("lokijs");
var db = new loki(__dirname + "/users.json");

var passport = require("passport");

io.on("connection", function(socket) {
  console.log("a user connected [socketIO]");
});

let userfiles = "userfiles";

db.loadDatabase({}, function() {
  let _collection = db.getCollection(userfiles);

  if (!_collection) {
    console.log("Collection %s does not exit. Creating ...", userfiles);
    _collection = db.addCollection(userfiles);
  }

  var userList = _collection.where(function(obj) {
    return obj.sentTime != null;
  });
});

// Configure the Basic strategy for use by Passport.
passport.use(
  new Strategy(function(username, password, cb) {
    db.loadDatabase({}, function() {
      let _collection = db.getCollection(userfiles);

      if (!_collection) {
        console.log("Collection %s does not exit. Creating ...", userfiles);
        _collection = db.addCollection(userfiles);
      }

      var userList = _collection.find({ username: { $eq: username } });
      console.log("userList:");
      console.log(userList);
      if (userList.length > 0 && userList[0].userpassword != "undefined") {
        var hashedPW = userList[0].userpassword;
        if (hashedPW == getHash(password)) {
          return cb(null, username);
        } else {
          return cb(null, false);
        }
      } else {
        return cb(null, false);
      }
    });
  })
);

var _user_name = null;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", passport.authenticate("basic", { session: false }), (req, res) => {
  console.log("req.user");
  console.log(req.user);
  _user_name = req.user;
  res.sendFile(path.resolve(__dirname + "/build/index.html"));
});

app.get(
  "/currentusername",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    res.send(_user_name);
  }
);

app.get("/build", express.static("build"));

app.use("/socket.io", express.static("node_modules/socket.io/socket.js"));

app.get(
  "/info/:username",
  passport.authenticate("basic", { session: false }),
  function(req, res) {
    res.send(req.params);
  }
);

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/build/service-worker.js"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/register.html"));
});

app.post("/process/register", (req, res) => {
  var user_name = req.body.login;
  var user_pw = getHash(req.body.password);
  console.log(req.body);
  let homeLink = "<a href='../../..'>Home</a>";
  let createdAt = Date.now();

  db.loadDatabase({}, function() {
    let _collection = db.getCollection(userfiles);

    if (!_collection) {
      console.log("Collection %s does not exit. Creating ...", userfiles);
      _collection = db.addCollection(userfiles);
    }

    _collection.insertOne({
      username: user_name,
      userpassword: user_pw,
      created_at: createdAt
    });

    db.saveDatabase();

    res.send(user_name + " " + user_pw + " created    | " + homeLink);
  });
});

app.use("/static", express.static("build/static"));
