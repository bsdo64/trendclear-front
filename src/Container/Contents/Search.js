import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import LoginStore from '../../Stores/LoginStore';
import CommunityStore from '../../Stores/CommunityStore';
import UserStore from '../../Stores/UserStore';
import SearchStore from '../../Stores/SearchStore';
import BestPostStore from '../../Stores/BestPostStore';
import GnbStore from '../../Stores/GnbStore';

import Best from '../../Components/Contents/Best';

const SearchHeader = React.createClass({
  displayName: 'SearchHeader',
  render() {
    "use strict";
    const {posts, postList} = this.props;
    if (posts) {
      const postData = posts.get('posts');
      const total = postData.get('total') ? postData.get('total'): 0;

      return (
        <div className="search-header">
          검색 결과 {total}개
        </div>
      );
    }

    return <div></div>
  }
});

const SearchContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, LoginStore, CommunityStore, UserStore, SearchStore, BestPostStore]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      BestPostStore: BestPostStore.getState(),
      LoginStore: LoginStore.getState(),
      CommunityStore: CommunityStore.getState(),
      SearchStore: SearchStore.getState(),
      UserStore: UserStore.getState()
    }
  }
}, React.createClass({
  render() {

    const {SearchStore} = this.props;
    const searchPosts = SearchStore.get('search');

    return (
      <div id="best_contents" ref="best_contents">
        <SearchHeader posts={searchPosts}/>

        <Best
          {...this.props}
        />
        
      </div>
    )
  }
}));

module.exports = SearchContainer;
