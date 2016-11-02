import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import SettingStore from '../../Stores/SettingStore';
import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';

import Setting from '../../Components/Contents/Setting';

const SettingContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SettingStore, Users, AuthStore]
  },

  getPropsFromStores() {
    return {
      SettingStore: SettingStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
    }
  }
}, React.createClass({
  render() {
    return (<Setting {...this.props} />)
  }
}));

module.exports = SettingContainer;
