import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import LoginStore from '../../Stores/LoginStore';
import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';

import LoginModalBox from '../../Components/LoginModalBox';

const LoginModalContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, Users, AuthStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
    }
  }
}, React.createClass({
  render() {
    return (<LoginModalBox {...this.props} />)
  }
}));


module.exports = LoginModalContainer;
