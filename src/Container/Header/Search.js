import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import LoginStore from '../../Stores/LoginStore';
import SearchStore from '../../Stores/SearchStore';
import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';

import SearchBar from '../../Components/Header/search';

const MyMenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, Users, AuthStore, SearchStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
      SearchStore: SearchStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<SearchBar {...this.props} />)
  }
}));

module.exports = MyMenuContainer;
