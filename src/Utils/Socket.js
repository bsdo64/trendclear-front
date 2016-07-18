const io = require('socket.io-client');

let socket;
if (process.env.NODE_ENV === 'production') {
  socket = io.connect('http://venacle.com/noti');
} else {
  socket = io.connect('http://localhost:3003/noti');
}

module.exports = socket;
 