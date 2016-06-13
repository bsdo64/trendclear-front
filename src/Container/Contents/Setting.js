import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import SettingStore from '../../Stores/SettingStore';

import Setting from '../../Components/Contents/Setting';

const SettingContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SettingStore]
  },

  getPropsFromStores() {
    return {
      SettingStore: SettingStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Setting {...this.props} />)
  }
}));

module.exports = SettingContainer;
