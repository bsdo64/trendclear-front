import { Noti, Point, Venalink } from '../Utils/Socket';
import {
  receiveSocketNoti,
  receiveSocketPoint,
  receiveSocketTerminateVenalink,
} from './Actions/User';
import { normalize } from 'normalizr';
import { noti } from '../Model/normalizr/schema';

export default (store) => {
  Noti.on('comment_write noti', function(result) {
    result.notis = normalize(result.notis, [noti]);

    store.dispatch(receiveSocketNoti(result));
  });

  Point.on('receive point', function(result) {
    store.dispatch(receiveSocketPoint(result));
  });

  Venalink.on('terminate venalink', function(result) {
    store.dispatch(receiveSocketTerminateVenalink(result));
  });
};
