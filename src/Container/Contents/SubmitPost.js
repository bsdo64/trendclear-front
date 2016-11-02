import React from 'react';
import alt from '../../Utils/alt';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import LoginStore from '../../Stores/LoginStore';
import SubmitStore from '../../Stores/SubmitStore';
import Users from '../../Stores/Domain/Users';

import Posts from '../../Stores/Domain/Posts';
import AuthStore from '../../Stores/UI/AuthStore';

import Submit from '../../Components/Contents/Submit';

const SubmitPostContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [Posts, SubmitStore, LoginStore, Users, AuthStore];
  },

  getPropsFromStores() {
    return {
      Posts: Posts.getState(),
      SubmitStore: SubmitStore.getState(),
      AuthStore: AuthStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
      LoginStore: LoginStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Submit {...this.props} />);
  }
}));

module.exports = SubmitPostContainer;
