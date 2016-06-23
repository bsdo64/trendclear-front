const io = require('socket.io-client');
let socket;

  socket = io.connect('http://venacle.com/soc/noti');

module.exports = socket;
