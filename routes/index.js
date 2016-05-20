var express = require('express');
var router = express.Router();
var hbs = require('hbs');


/* GET home page. */
router.get('*', function(req, res, next) {
  console.log(req.headers);
  console.log(req.url);

  res.render('entry/index', {
    title: '트렌드클리어',
    production: process.env.production ? true : false
  });
});

module.exports = router;
