var express = require('express');
var router = express.Router();

var routes = [
  '/',
  '/collection/:collectionId',
  '/collection',
  '/community',
  '/community/submit',
  '/community/submit/category',
  '/community/submit/forum',
  '/activity',
  '/activity/likes',
  '/activity/posts',
  '/activity/comments',
  '/setting',
  '/setting/password',
  '/setting/profile',
  '/search',
  '/signin'
];

/* GET home page. */
router.get(routes, function(req, res, next) {
  console.log(req.headers);
  console.log(req.url);

  res.render('entry/index', {
    title: '베나클',
    production: process.env.NODE_ENV ? true : false
  });
});

module.exports = router;
