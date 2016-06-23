const io = require('socket.io-client');
let socket;

if (process.env.NODE_ENV === 'production') {
  socket = io.connect('http://io.venacle.com/soc/noti');
} else {
  socket = io.connect('http://localhost:3003/soc/noti');
}

module.exports = socket;
