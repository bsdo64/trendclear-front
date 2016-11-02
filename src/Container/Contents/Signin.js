import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import SigninFormStore from '../../Stores/UI/SigninFormStore';
import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';

import Signin from '../../Components/Contents/Signin';

const SigninContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SigninFormStore, Users, AuthStore]
  },

  getPropsFromStores() {
    return {
      SigninFormStore: SigninFormStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState())
    }
  }
}, React.createClass({
  render() {
    return (<Signin {...this.props} />)
  }
}));

module.exports = SigninContainer;
