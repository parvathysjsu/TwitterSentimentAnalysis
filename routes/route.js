var express = require('express');
var router = express.Router();
var Sentiment = require('sentiment');

router.get('/tweets/:hashtagname', function (req, res, next) {
  res.send("hello");
});
module.exports = router;
