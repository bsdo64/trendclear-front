var express = require('express');
var router = express.Router();

var routes = [
  '/',
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
var React = require('react');
var { renderToString } = require('react-dom/server');
var { match, RouterContext } = require('react-router');
var routes = require('../src/App/Routes');

router.get('*', function (req, res, next){
  "use strict";

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      res.render('entry/index', {
        title: '베나클',
        production: process.env.NODE_ENV ? true : false,
        html: renderToString(<RouterContext {...renderProps} />),
        server: true
      })
    } else {
      res.status(404).send('Not found')
    }
  })
});



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
