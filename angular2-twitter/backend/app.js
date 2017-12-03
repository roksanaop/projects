const express = require('express');
const tweets = require('./tweets');

const app = express();

// serve static assets from directory
app.use(express.static('app'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//setup routes
app.use('/tweets', tweets);

module.exports = app;

app.listen('8080', () => {
  console.log('Server listening on 8080');
});