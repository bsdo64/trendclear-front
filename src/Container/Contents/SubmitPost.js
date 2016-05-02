import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';
import SubmitStore from '../../Stores/SubmitStore';

import Submit from '../../Components/Contents/Submit';

const SigninContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SubmitStore, LoginStore, UserStore];
  },

  getPropsFromStores() {
    return {
      SubmitStore: SubmitStore.getState(),
      UserStore: UserStore.getState(),
      LoginStore: LoginStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Submit {...this.props} />)
  }
}));

module.exports = SigninContainer;
