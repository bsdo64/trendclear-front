import React from 'react';
import alt from '../../Utils/alt';
import connectToStores from 'alt-utils/lib/connectToStores';
import ActivityStore from '../../Stores/ActivityStore';
import {Map} from 'immutable';
import {getLoginUser} from '../Util/func'

import Policy from '../../Components/Contents/Policy';

const ActivityContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      ActivityStore,

      // UI Stores
      alt.getStore('LoginModalStore'),
      alt.getStore('AuthStore'),
      alt.getStore('PaginationStore'),
      alt.getStore('ListStore'),

      alt.getStore('Posts'),
      alt.getStore('Users'),
      alt.getStore('Forums')
    ]
  },

  getPropsFromStores() {

    return {
      ActivityStore: ActivityStore.getState(),
      UserStore: getLoginUser(alt.getStore('Users').getState(), alt.getStore('AuthStore').getState()),

      // UI Stores
      LoginModalStore: alt.getStore('LoginModalStore').getState(),
      AuthStore: alt.getStore('AuthStore').getState(),
      PaginationStore: alt.getStore('PaginationStore').getState(),
      ListStore: alt.getStore('ListStore').getState(),

      Posts: alt.getStore('Posts').getState(),
      Users: alt.getStore('Users').getState(),
      Forums: alt.getStore('Forums').getState()
    }
  }
}, React.createClass({
  render() {
    return (<Policy {...this.props} />)
  }
}));

module.exports = ActivityContainer;
