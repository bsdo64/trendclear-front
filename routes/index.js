var express = require('express');
var router = express.Router();
var hbs = require('hbs');

/* GET home page. */
router.get('*', function(req, res, next) {
  res.render('entry/index', { title: 'Express' });
});

module.exports = router;
