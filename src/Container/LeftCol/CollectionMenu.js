import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import Forums from '../../Stores/Domain/Forums';
import Collections from '../../Stores/Domain/Collections';

import ListStore from '../../Stores/UI/ListStore';

import GnbStore from '../../Stores/GnbStore';
import CommunityStore from '../../Stores/CommunityStore';
import UserStore from '../../Stores/UserStore';

import CollectionLeftMenu from '../../Components/CollectionLeftMenu';

const CollectionMenu = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, UserStore, CommunityStore, ListStore, Forums, Collections]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      CommunityStore: CommunityStore.getState(),
      UserStore: UserStore.getState(),

      ListStore: ListStore.getState(),

      Collections: Collections.getState(),
      Forums: Forums.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<CollectionLeftMenu {...this.props} />)
  }
}));

module.exports = CollectionMenu;
