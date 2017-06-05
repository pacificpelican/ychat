//  ExpressJS startup page for ychat App by Dan McKeown http://danmckeown.info

const express = require('express');
const app = express();
var path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

app.use('/static', express.static('build/static'));

app.listen(3000, function () {
  console.log('ychat app listening on port 3000');
});
