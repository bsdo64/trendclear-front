import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {getLoginUser} from '../Util/func';

import Shopping from '../../Components/Modal/Components/Shopping';

import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';
import ShoppingStore from '../../Stores/UI/ShoppingStore';

const ShoppingContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [Users, AuthStore, ShoppingStore]
  },

  getPropsFromStores() {
    return {
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
      ShoppingStore: ShoppingStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Shopping {...this.props} />)
  }
}));


module.exports = ShoppingContainer;
