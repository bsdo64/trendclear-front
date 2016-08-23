const  express = require('express');
const router = express.Router();

const routes = [
  '/',
  '/collection/:collectionId',
  '/community',
  '/community/submit',
  '/community/submit/category',
  '/community/submit/forum',
  '/community/settings',
  '/community/settings/foruminfo',
  '/community/settings/forumurl',
  '/community/settings/announce',
  '/community/settings/writepost',
  '/community/settings/writecomment',
  '/community/settings/share',
  '/community/settings/promotion',
  '/community/settings/managers',
  '/community/settings/banlist',
  '/community/settings/spams',
  '/community/settings/spamreports',
  '/community/settings/stat/forum',
  '/community/settings/stat/views',
  '/community/settings/stat/visitors',
  '/community/settings/stat/likerank',
  '/community/settings/stat/commentrank',
  '/community/settings/stat/viewrank',
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
