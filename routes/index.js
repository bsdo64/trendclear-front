const  express = require('express');
const router = express.Router();

const routes = [
  '/',
  '/collection/:collectionId',
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

const redirectRoutes = [
  '/collection'
];

const redirectTo = {
  '/collection': '/'
};

router.get(redirectRoutes, function (req, res, next) {
  console.log(req.headers);
  console.log(req.path);

  let redirect = redirectTo[req.path];
  if (redirect) {
    res.redirect(redirect);
  } else {
    res.redirect('/');
  }

  next();
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

/* 404 page. */
router.get('*', function(req, res, next) {
  console.log(req.headers);
  console.log(req.url);

  res.redirect('/');
});

module.exports = router;
