/**
 * Created by dobyeongsu on 2016. 10. 31..
 */
import {Map} from 'immutable';

export function getLoginUser (Users, AuthStore) {
  const user = Users.get(String(AuthStore.get('userId')));
  if (user) {
    return user;
  } else {
    return Map({});
  }
}
