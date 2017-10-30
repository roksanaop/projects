const express = require('express');
const router = express.Router();
const Twitter = require('twitter');

//Twitter module
const twitter = new Twitter({
    consumer_key: 'GR6wPCChuEBQU2nweJ6dSqAkr',
    consumer_secret: '12cI51wuC05Y8srxEFBilXmccKF8Sg7rTsuNJumZzhiw5bWFtO',
    access_token_key: '796401972194791424-6sITceYBqqh6ll1KCkoNKGZFAZf1A1C',
    access_token_secret: 'CqfpNQ0j2O4PzQRaWz4yonJEIllX3rLMxRVUmSA1i78C0'
});

var clientStream = [];

//GET stream JSON
router.get('/filter/:query', (req, res, body) => {

  var params = {
    track: req.params.query
  }
  var twit = [];

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
  var tweets = [];
  var params = {
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