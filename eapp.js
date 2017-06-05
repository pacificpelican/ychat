//  ExpressJS startup page for ychat App by Dan McKeown http://danmckeown.info

const express = require('express')
const app = express()
var path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

app.use('/static', express.static('build/static'))

// Always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/build/index.html'));
// });

// app.get('/static/css/main.18fa6da6.css', function(req, res) {
//     res.sendFile(path.join(__dirname + '/build/static/css/main.18fa6da6.css'));
// });

// app.get('/static/js/main.7c5918f8.js', function(req, res) {
//     res.sendFile(path.join(__dirname + '/build/static/js/main.7c5918f8.js'));
// });

//  app.use('/build/static', express.static(__dirname + '/static'));

app.listen(3000, function () {
  console.log('Causes app listening on port 3000')
})