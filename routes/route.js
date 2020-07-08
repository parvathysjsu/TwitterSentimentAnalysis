var express = require('express');
var router = express.Router();
var Sentiment = require('sentiment');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

router.get('/tweets/:hashtagname', function (req, res, next) {
  res.send("hello");

  client.get('search/tweets', { q: '#ios #swift' }, function (error, tweets, response) {
    tweets.statuses.forEach(function (tweet) {
      console.log("tweet: " + tweet.text)
    });
  });

});
/*
router.get('/image', function (req, res, next) {  

  const textToImage = require('text-to-image');
textToImage.generate('Lorem ipsum dolor sit amet').then(function (dataUri) {
  console.log(dataUri);
  res.send(dataUri);
});

textToImage.generate('Lorem ipsum dolor sit amet', {
  debug: true,
  maxWidth: 720,
  fontSize: 18,
  fontFamily: 'Arial',
  lineHeight: 30,
  margin: 5,
  bgColor: "blue",
  textColor: "red"
}).then(function (dataUri) {
  console.log(dataUri);
});

});*/

module.exports = router;
