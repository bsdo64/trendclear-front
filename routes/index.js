var express = require('express');
var router = express.Router();
var hbs = require('hbs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('entry/index', { title: 'Express' });
});

/* GET home page. */
router.get('/profile', function(req, res, next) {
  res.render('entry/profile', { title: 'Express' });
});

/* GET home page. */
router.get('/signin', function(req, res, next) {
  res.render('entry/signin', { title: 'Express' });
});

/* GET home page. */
router.get('/community', function(req, res, next) {
  var clubId = req.query.club_id;
  var postId = req.query.post_id;
  var categoryId = req.query.category_id;

  res.render('entry/club', { title: 'Express' });
});

module.exports = router;
