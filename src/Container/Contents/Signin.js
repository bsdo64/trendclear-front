import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import SigninFormStore from '../../Stores/UI/SigninFormStore';
import UserStore from '../../Stores/UserStore';

import Signin from '../../Components/Contents/Signin';

const SigninContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SigninFormStore, UserStore]
  },

  getPropsFromStores() {
    return {
      SigninFormStore: SigninFormStore.getState(),
      UserStore: UserStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Signin {...this.props} />)
  }
}));

module.exports = SigninContainer;
