const io = require('socket.io-client');
const cookie = require('cookie');
const parsedCookie = cookie.parse(document.cookie);

let socket;
if (process.env.NODE_ENV === 'production') {
  socket = io.connect('http://venacle.com/noti', {query: { token: parsedCookie.token, sessionId: parsedCookie.sessionId}});
} else {
  socket = io.connect('http://localhost:3003/noti', {query: { token: parsedCookie.token, sessionId: parsedCookie.sessionId}});
}

module.exports = socket;
