import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ActivityStore from '../../Stores/ActivityStore';

import Activity from '../../Components/Contents/Activity';

const ActivityContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [ActivityStore]
  },

  getPropsFromStores() {
    return {
      ActivityStore: ActivityStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Activity {...this.props} />)
  }
}));

module.exports = ActivityContainer;
