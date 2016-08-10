import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import GnbStore from '../../Stores/GnbStore';
import Forums from '../../Stores/Domain/Forums';
import CommunityStore from '../../Stores/CommunityStore';

import CategoryList from '../../Components/CategoryList';

const MenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, CommunityStore, Forums]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      CommunityStore: CommunityStore.getState(),
      Forums: Forums.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<CategoryList {...this.props} />)
  }
}));

module.exports = MenuContainer;
