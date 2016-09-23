import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import GnbStore from '../../Stores/GnbStore';
import CommunityStore from '../../Stores/CommunityStore';
import UserStore from '../../Stores/UserStore';
import Forums from '../../Stores/Domain/Forums';
import Collections from '../../Stores/Domain/Collections';
import AuthStore from '../../Stores/UI/AuthStore';
import ListStore from '../../Stores/UI/ListStore';
import SearchStore from '../../Stores/SearchStore';

import CategoryList from '../../Components/ForumLeftMenu';

import {Link} from 'react-router';

const MenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [SearchStore, GnbStore, UserStore, CommunityStore, ListStore, Forums, Collections, AuthStore]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      SearchStore: SearchStore.getState(),
      CommunityStore: CommunityStore.getState(),
      UserStore: UserStore.getState(),
      AuthStore: AuthStore.getState(),

      ListStore: ListStore.getState(),

      Collections: Collections.getState(),
      Forums: Forums.getState(),
    }
  }
}, React.createClass({
  render() {
    const {SearchStore} = this.props;
    const query = SearchStore.get('query');
    return (
      <div id="forum_category">
        {/* Title */}
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'검색 : ' + query}</div>
          </div>
        </div>

        {/* Menu */}
        <menu className="sub_category_list">

          <ul >
            <li >
              <h5 className="">
                <a><i className="fa fa-search"/>{' 검색피드'}</a>
              </h5>

              <div className="sub_category item">
                <Link to={{pathname: '/search', query: {query: query, order: 'new'}}}>{'최신 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{pathname: '/search', query: {query: query, order: 'hot'}}}>{'인기 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{pathname: '/search', query: {query: query, order: 'm_view'}}}>{'많이 본 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{pathname: '/search', query: {query: query, order: 'm_comment'}}}>{'댓글 많은 글'}</Link>
              </div>
            </li>
          </ul>
        </menu>
      </div>
    );
  }
}));

module.exports = MenuContainer;
