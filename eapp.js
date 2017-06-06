//  ExpressJS startup page for ychat App by Dan McKeown http://danmckeown.info

const express = require('express');
const app = express();
var path = require('path');

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/testdb', function (err, db) {
  if (err) console.log(err);
      //throw err 
    db.collection('testcollection').insertOne( {
      "key" :  Math.floor((Math.random() * 9) + 1)  });
    db.collection('testcollection').find().toArray(function (err, result) {
      if (err) console.log(err);
      console.log(result);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

app.use('/static', express.static('build/static'));

app.listen(3000, function () {
  console.log('ychat app listening on port 3000');
});
