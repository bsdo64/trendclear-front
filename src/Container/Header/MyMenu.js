import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';

import MyArea from '../../Components/MyArea';

const MyMenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, UserStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: UserStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<MyArea {...this.props} />)
  }
}));

module.exports = MyMenuContainer;
