import {Noti, Point} from '../Utils/Socket';
import UserActions from '../Actions/UserActions';

Noti.on('comment_write noti', function (data) {
  UserActions.socketNoti(data);
});

Point.on('receive point', function (data) {
  "use strict";
  UserActions.socketPoint(data);
});