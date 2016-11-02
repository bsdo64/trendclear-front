import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';

import LoginStore from '../../Stores/LoginStore';
import ShoppingStore from '../../Stores/UI/ShoppingStore';
import Users from '../../Stores/Domain/Users';
import Forums from '../../Stores/Domain/Forums';
import AuthStore from '../../Stores/UI/AuthStore';

import WidgetBox from '../../Components/WidgetBox';

const WidgetContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, ShoppingStore, Users, AuthStore, Forums]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
      ShoppingStore: ShoppingStore.getState(),
      Forums: Forums.getState()
    }
  }
}, React.createClass({
  render() {

    return (<WidgetBox {...this.props} />)
  }
}));

module.exports = WidgetContainer;
