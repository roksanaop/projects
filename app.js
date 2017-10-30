const express = require('express');
const index = require('./routes/index');
const tweets = require('./routes/tweets');

const app = express();

// serve static assets from directory
app.use(express.static('app'));

//setup routes
app.use('/', index);
app.use('/tweets', tweets);

module.exports = app;

app.listen('8080', () => {
  console.log('Server listening on 8080');
});