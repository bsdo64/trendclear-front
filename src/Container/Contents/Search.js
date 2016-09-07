import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import alt from '../../Utils/alt';

import LoginStore from '../../Stores/LoginStore';
import CommunityStore from '../../Stores/CommunityStore';
import UserStore from '../../Stores/UserStore';
import SearchStore from '../../Stores/SearchStore';
import GnbStore from '../../Stores/GnbStore';

import Posts from '../../Stores/Domain/Posts';
import Users from '../../Stores/Domain/Users';
import Forums from '../../Stores/Domain/Forums';

import AuthStore from '../../Stores/UI/AuthStore';
import LoginModalStore from '../../Stores/UI/LoginModalStore';
const PaginationStore = alt.getStore('PaginationStore');
const ListStore = alt.getStore('ListStore');

import SearchHeader from '../../Components/Contents/Search/header';
import Search from '../../Components/Contents/Search';

const SearchContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      GnbStore,
      LoginStore,
      CommunityStore,
      UserStore,
      SearchStore,

      // UI Stores
      LoginModalStore,
      AuthStore,
      PaginationStore,
      ListStore,

      // Domain Stores
      Posts,
      Users,
      Forums
    ]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      LoginStore: LoginStore.getState(),
      CommunityStore: CommunityStore.getState(),
      SearchStore: SearchStore.getState(),

      UserStore: UserStore.getState(),
      PaginationStore: PaginationStore.getState(),
      ListStore: ListStore.getState(),

      AuthStore:        AuthStore.getState(),
      LoginModalStore:  LoginModalStore.getState(),

      Forums:           Forums.getState(),
      Users:            Users.getState(),
      Posts:            Posts.getState()
    }
  }
}, React.createClass({
  render() {

    const {SearchStore} = this.props;
    const searchPosts = SearchStore.get('search');

    return (
      <div id="best_contents" ref="best_contents">
        <SearchHeader posts={searchPosts}/>

        <Search
          {...this.props}
        />
        
      </div>
    )
  }
}));

module.exports = SearchContainer;
