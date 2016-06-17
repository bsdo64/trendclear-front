import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import SettingStore from '../../Stores/SettingStore';
import UserStore from '../../Stores/UserStore';

import Setting from '../../Components/Contents/Setting';

const SettingContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SettingStore, UserStore]
  },

  getPropsFromStores() {
    return {
      SettingStore: SettingStore.getState(),
      UserStore: UserStore.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<Setting {...this.props} />)
  }
}));

module.exports = SettingContainer;
