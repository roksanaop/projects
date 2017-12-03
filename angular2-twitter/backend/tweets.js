const dotenv = require('dotenv');
dotenv.load();
const express = require('express');
const router = express.Router();
const Twitter = require('twitter');

//Twitter module
const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let clientStream = [];
//GET stream JSON
router.get('/filter/:query', (req, res, body) => {
  let params = {
    track: req.params.query
  }
  let twit = [];
  
  twitter.stream('statuses/filter', params, (stream) => {
    if (Object.keys(clientStream).length !== 0) {
      clientStream.destroy();
    }
    clientStream = stream;
    res.set('Content-Type', 'application/json');
    stream.on('data', (event) => {
      twit = event;
      res.write(JSON.stringify(twit));
    });
    stream.on('end', () => {
      stream.destroy();
    });
    stream.on('error', (error) => {
      stream.destroy();
      // throw error;
    });
  });
});

//GET tweets JSON
router.get('/search/:query', (req, res) => {
  const MAX_TWEETS = 3;
  let tweets = [];
  let params = {
    q: req.params.query,
    count: MAX_TWEETS
  }
  twitter.get('search/tweets', params, (err, data, resp) => {
    tweets = data.statuses;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(tweets));
  });
});

module.exports = router;