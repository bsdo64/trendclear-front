import React from 'react';
import alt from '../../Utils/alt';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import ForumSettingStore from '../../Stores/UI/ForumSettingStore';

import ForumSettingsComponent from '../../Components/Contents/ForumSetting';

const ForumSettingsContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      // UI Stores
      alt.getStore('AuthStore'),
      alt.getStore('PaginationStore'),
      alt.getStore('CommunityStore'),
      alt.getStore('ListStore'),
      alt.getStore('ForumSettingStore'),

      // Domain Stores
      alt.getStore('Users'),
      alt.getStore('Forums'),
      alt.getStore('Posts'),
      alt.getStore('Prefixes'),
      alt.getStore('Collections')
    ]
  },

  getPropsFromStores() {
    return {
      UserStore: getLoginUser(alt.getStore('Users').getState(), alt.getStore('AuthStore').getState()),

      // UI Stores
      AuthStore: alt.getStore('AuthStore').getState(),
      PaginationStore: alt.getStore('PaginationStore').getState(),
      CommunityStore: alt.getStore('CommunityStore').getState(),
      ListStore: alt.getStore('ListStore').getState(),
      ForumSettingStore: alt.getStore('ForumSettingStore').getState(),

      Users: alt.getStore('Users').getState(),
      Forums: alt.getStore('Forums').getState(),
      Posts: alt.getStore('Posts').getState(),
      Prefixes: alt.getStore('Prefixes').getState(),
      Collections: alt.getStore('Collections').getState(),
    }
  }
}, React.createClass({
  render() {

    return (<ForumSettingsComponent {...this.props} />)
  }
}));

module.exports = ForumSettingsContainer;
