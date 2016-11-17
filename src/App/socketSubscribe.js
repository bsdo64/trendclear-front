import { Noti, Point } from '../Utils/Socket';

export default (store) => {
  Noti.on('comment_write noti', function (data) {
    store.dispatch(/*UserActions.socketNoti(data);*/);
  });

  Point.on('receive point', function (data) {
    store.dispatch(/*UserActions.socketPoint(data);*/);
  });
}