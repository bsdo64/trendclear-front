const io = require('socket.io-client');
let socket;

if (process.env.NODE_ENV === 'production') {
  socket = io.connect('http://www.venacle.com:3001/noti');
} else {
  socket = io.connect('http://localhost:3001/noti');
}

module.exports = socket;