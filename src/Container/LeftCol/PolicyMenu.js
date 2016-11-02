import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';

import GnbStore from '../../Stores/GnbStore';
import CommunityStore from '../../Stores/CommunityStore';
import Forums from '../../Stores/Domain/Forums';
import Collections from '../../Stores/Domain/Collections';
import AuthStore from '../../Stores/UI/AuthStore';
import ListStore from '../../Stores/UI/ListStore';

import CategoryList from '../../Components/PolicyMenu';
import Users from '../../Stores/Domain/Users';

const MenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, Users, CommunityStore, ListStore, Forums, Collections, AuthStore]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      CommunityStore: CommunityStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
      AuthStore: AuthStore.getState(),

      ListStore: ListStore.getState(),

      Collections: Collections.getState(),
      Forums: Forums.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<CategoryList {...this.props} />)
  }
}));

module.exports = MenuContainer;
