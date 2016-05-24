import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import LoginStore from '../../Stores/LoginStore';
import CommunityStore from '../../Stores/CommunityStore';
import UserStore from '../../Stores/UserStore';
import SearchStore from '../../Stores/SearchStore';

import BestList from '../../Components/Contents/Best/BestList';

const SearchContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, CommunityStore, UserStore, SearchStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      CommunityStore: CommunityStore.getState(),
      SearchStore: SearchStore.getState(),
      UserStore: UserStore.getState()
    }
  }
}, React.createClass({
  render() {

    const {SearchStore, LoginStore, UserStore} = this.props;
    const searchPosts = SearchStore.get('search');

    return (
      <div id="best_contents" ref="best_contents">
        <div>검색 결과 200개</div>
        <div>검색 리스트</div>

        <BestList
          LoginStore={LoginStore}
          UserStore={UserStore}
          posts={searchPosts}
        />
        
      </div>
    )
  }
}));

module.exports = SearchContainer;
