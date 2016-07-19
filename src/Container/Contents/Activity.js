import React from 'react';
import alt from '../../Utils/alt';
import connectToStores from 'alt-utils/lib/connectToStores';
import ActivityStore from '../../Stores/ActivityStore';
import UserStore from '../../Stores/UserStore';

import Activity from '../../Components/Contents/Activity';

const ActivityContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      ActivityStore, 
      UserStore,

      // UI Stores
      alt.getStore('LoginModalStore'),
      alt.getStore('AuthStore'),
      alt.getStore('PaginationStore'),
      alt.getStore('ListStore'),

      alt.getStore('Posts'),
      alt.getStore('Users'),
      alt.getStore('Categories'),
      alt.getStore('Clubs'),
      alt.getStore('CategoryGroups'),
      alt.getStore('Forums')
    ]
  },

  getPropsFromStores() {
    return {
      ActivityStore: ActivityStore.getState(),
      UserStore: UserStore.getState(),

      // UI Stores
      LoginModalStore: alt.getStore('LoginModalStore').getState(),
      AuthStore: alt.getStore('AuthStore').getState(),
      PaginationStore: alt.getStore('PaginationStore').getState(),
      ListStore: alt.getStore('ListStore').getState(),

      Posts: alt.getStore('Posts').getState(),
      Users: alt.getStore('Users').getState(),
      Categories: alt.getStore('Categories').getState(),
      Clubs: alt.getStore('Clubs').getState(),
      CategoryGroups: alt.getStore('CategoryGroups').getState(),
      Forums: alt.getStore('Forums').getState()
    }
  }
}, React.createClass({
  render() {
    return (<Activity {...this.props} />)
  }
}));

module.exports = ActivityContainer;
