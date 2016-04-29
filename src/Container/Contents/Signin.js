import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import SigninStore from '../../Stores/SigninStore';

import Signin from '../../Components/Contents/Signin';

const SigninContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SigninStore]
  },

  getPropsFromStores() {
    return {
      SigninStore: SigninStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Signin {...this.props} />)
  }
}));

module.exports = SigninContainer;
