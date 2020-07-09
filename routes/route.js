var express = require('express');
var router = express.Router();
var Sentiment = require('sentiment');
var Twitter = require('twitter');
var properties = require('./../config/properties')
var client = new Twitter({
  consumer_key: properties.twitterKeys.consumer_key,
  consumer_secret: properties.twitterKeys.consumer_secret,
  access_token_key: properties.twitterKeys.access_token_key,
  access_token_secret: properties.twitterKeys.access_token_secret
});
router.get('/', function (req, res, next) {
  res.render('index')
})
router.post('/analysis', function (req, res, next) {
  console.log(req.body.query);
  let hashtagName = req.body.query;
  let positiveTweets = 0;
  let negativeTweets = 0;
  let neutralTweets = 0;
  let result = {};
  let tweetRecords = [];
  var sentiment = new Sentiment();
  client.get('search/tweets', { q: hashtagName, count: 100 }, function (error, tweets, response) {
    tweets.statuses.forEach(function (tweet) {
      // console.log("-----"+JSON.stringify(tweet))
      // console.log("-----" + i + "-----tweet: " + tweet.text)     
      var res_score = sentiment.analyze(tweet.text);
      if (res_score["score"] > 0)
        positiveTweets = positiveTweets + 1;
      else if (res_score["score"] < 0)
        negativeTweets = negativeTweets + 1;
      else
        neutralTweets = neutralTweets + 1;
        tweetRecords.push({
          "tweet": tweet.text.replace(/[\r\n]+/gm," "),
          "score":res_score["score"],
          "positive":res_score["positive"],
          "negative":res_score["negative"]
        })    
    });
    result.query=req.body.query;
    result.positiveTweets=positiveTweets;
    result.negativeTweets=negativeTweets;
    result.neutralTweets=neutralTweets;
    result.tweets=tweetRecords;
    res.render('result', {
      res: result
    })
  });  
})

router.get('/tweets/:hashtagname', function (req, res, next) {
  //  res.send("hello")
  let hashtagName = '#' + req.params.hashtagname//+"&count=100";
  let i = 1;
  let positiveTweets = 0;
  let negativeTweets = 0;
  let neutralTweets = 0;
  var sentiment = new Sentiment();
  client.get('search/tweets', { q: hashtagName, count: 15 }, function (error, tweets, response) {
    tweets.statuses.forEach(function (tweet) {
      // console.log("-----"+JSON.stringify(tweet))
      console.log("-----" + i + "-----tweet: " + tweet.text)
      i = i + 1;
      var res_score = sentiment.analyze(tweet.text);
      console.log('%c%s', 'color: #00a3cc', res_score["score"]);
      console.log('%c%s', 'color: #00a3cc', res_score["positive"]);
      console.log('%c%s', 'color: #00a3cc', res_score["negative"]);
    });
  });
  res.send("hello")
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
