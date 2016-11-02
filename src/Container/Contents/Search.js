import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import alt from '../../Utils/alt';

import LoginStore from '../../Stores/LoginStore';
import CommunityStore from '../../Stores/CommunityStore';
import SearchStore from '../../Stores/SearchStore';
import GnbStore from '../../Stores/GnbStore';

import Posts from '../../Stores/Domain/Posts';
import Users from '../../Stores/Domain/Users';
import Forums from '../../Stores/Domain/Forums';
import Collections from '../../Stores/Domain/Collections';

import AuthStore from '../../Stores/UI/AuthStore';
import LoginModalStore from '../../Stores/UI/LoginModalStore';
const PaginationStore = alt.getStore('PaginationStore');
const ListStore = alt.getStore('ListStore');

import Search from '../../Components/Contents/Search';

const SearchContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      GnbStore,
      LoginStore,
      CommunityStore,
      SearchStore,

      // UI Stores
      LoginModalStore,
      AuthStore,
      PaginationStore,
      ListStore,

      // Domain Stores
      Posts,
      Users,
      Forums,
      Collections,
    ]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      LoginStore: LoginStore.getState(),
      CommunityStore: CommunityStore.getState(),
      SearchStore: SearchStore.getState(),

      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
      PaginationStore: PaginationStore.getState(),
      ListStore: ListStore.getState(),

      AuthStore:        AuthStore.getState(),
      LoginModalStore:  LoginModalStore.getState(),

      Forums:           Forums.getState(),
      Users:            Users.getState(),
      Posts:            Posts.getState(),
      Collections:            Collections.getState()
    }
  }
}, React.createClass({
  render() {
    return (
      <Search
        {...this.props}
      />
    )
  }
}));

module.exports = SearchContainer;
