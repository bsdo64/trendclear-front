import socket from '../Utils/Socket';
import UserActions from '../Actions/UserActions';

socket.on('comment_write noti', function (data) {
  UserActions.socketNoti(data);
});