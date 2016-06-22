var express = require('express');
var router = express.Router();

var routes = [
  '/',
  '/community',
  '/activity',
  '/activity/likes',
  '/activity/posts',
  '/activity/comments',
  '/setting',
  '/setting/password',
  '/setting/profile',
  '/search',
  '/signin'
]

/* GET home page. */
router.get(routes, function(req, res, next) {
  console.log(req.headers);
  console.log(req.url);
  console.log(process.env);

  res.render('entry/index', {
    title: '베나클',
    production: process.env.production ? true : false
  });
});

module.exports = router;
