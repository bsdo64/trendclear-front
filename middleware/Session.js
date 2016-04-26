/**
 * Created by dobyeongsu on 2016. 2. 2..
 */
var connectRedis = require('connect-redis');
var session = require('express-session');

const RedisStore = connectRedis(session);
exports.configSession = function configSession() {
  return session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      db: 0
    }),
    secret: '1234567890QWERTY',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false
  });
};

exports.initSession = function initSession(req, res, next) {
  if (!req.session.initialized) {
    req.session.initialized = true;
    req.session.save((err) => {
      next();
    });
  } else {
    req.session.touch();
    next();
  }
}
