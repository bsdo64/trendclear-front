import { Map } from 'immutable';

const initMap = Map({
  isLogin: false,
  userId: null
});

const Auth = (state = initMap, action) => {

  return state;
};

export default Auth;
