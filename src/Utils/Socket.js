const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/noti');

module.exports = socket;