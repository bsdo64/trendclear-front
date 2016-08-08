import React from 'react';
import alt from '../../Utils/alt';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';
import SubmitStore from '../../Stores/SubmitStore';

import Posts from '../../Stores/Domain/Posts';
import AuthStore from '../../Stores/UI/AuthStore';

import Submit from '../../Components/Contents/Submit';

const SubmitPostContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [Posts, SubmitStore, LoginStore, UserStore, AuthStore];
  },

  getPropsFromStores() {
    return {
      Posts: Posts.getState(),
      SubmitStore: SubmitStore.getState(),
      AuthStore: AuthStore.getState(),
      UserStore: UserStore.getState(),
      LoginStore: LoginStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Submit {...this.props} />);
  }
}));

module.exports = SubmitPostContainer;
