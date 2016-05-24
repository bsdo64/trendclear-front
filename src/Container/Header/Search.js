import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';
import SearchStore from '../../Stores/SearchStore';

import SearchBar from '../../Components/Header/search';

const MyMenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, UserStore, SearchStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: UserStore.getState(),
      SearchStore: SearchStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<SearchBar {...this.props} />)
  }
}));

module.exports = MyMenuContainer;
