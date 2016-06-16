import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ActivityStore from '../../Stores/ActivityStore';
import UserStore from '../../Stores/UserStore';

import Activity from '../../Components/Contents/Activity';

const ActivityContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [ActivityStore, UserStore]
  },

  getPropsFromStores() {
    return {
      ActivityStore: ActivityStore.getState(),
      UserStore: UserStore.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<Activity {...this.props} />)
  }
}));

module.exports = ActivityContainer;
