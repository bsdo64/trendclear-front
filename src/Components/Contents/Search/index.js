import React from 'react';
import {Link} from 'react-router';
import Waypoint from 'react-waypoint';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import cx from 'classnames';

import SearchHeader from './header';
import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';

import PostActions from '../../../Actions/PostActions';
import GnbActions from '../../../Actions/GnbActions';

require('./index.scss');
const SearchBox = React.createClass({
  componentWillUnmount() {
    // some example callbacks

    GnbActions.resetFilter();
  },
  componentDidMount() {
    $('.ui.embed').embed();
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },

  getMoreBest() {
    "use strict";

    const {PaginationStore, SearchStore, location} = this.props;
    const Pagination = PaginationStore.get('searchPostList');
    if (Pagination) {
      const nextPage = Pagination.get('next_page');

      if (nextPage) {
        PostActions.getSearchPost({
          page: nextPage,
          order: location.query.order || 'new',
          query: SearchStore.get('query')
        });
      }
    }
  },
  checkCollectionHasForums() {

  },
  selectCollection() {

},
  openLoginModal() {

  },
  toggleFollow() {

},
  render() {
    const {SearchStore, Collections, ListStore, Forums, Posts, Users, AuthStore, PaginationStore, LoginModalStore} = this.props;
    const Collection = PaginationStore.get('searchPostList');
    const searchPosts = SearchStore.get('search');

    const searchForumList = ListStore.get('searchForumList');

    const self = this;

    return (
      <div id="best_contents" >

        <div id="search_forum_list">
          <h4>게시판</h4>
          <div className="search-forum-box">
            <ul className="search-forum-list">
              {
                searchForumList &&
                searchForumList.map(forumId => {
                  "use strict";
                  const forum = Forums.get(forumId.toString());
                  if (!forum) return null;

                  const creator = forum.get('creator');
                  if (!creator) return null;

                  const userId = AuthStore.get('userId');
                  const isLogin = AuthStore.get('isLogin');

                  const isUserForumFollow = isLogin
                    ? Users
                    .get(userId.toString())
                    .get('follow_forums')
                    .find(v => v === forumId)
                    : false;

                  const cFollowActive = cx('ui button primary basic tiny right floated follow_button', {
                    active: isUserForumFollow
                  });

                  if (forum) {
                    return (
                      <li key={forumId} className="search-forum-item">
                        <div id="forum_info" style={{
                          margin: '0 0 0 2px',
                          padding: 0,
                        }}>
                          <div className="ui cards">
                            <div className="card" style={{
                              boxShadow: 'none',
                              width: '100%'
                            }}>
                              <div className="content">
                                <div className="header">
                                  <Link to={`/community?forumId=${forumId}`}>{forum.get('title')}</Link>

                                  {
                                    (userId === creator.get('id')) &&
                                    <Link to={`/community/settings?forumId=${forumId}`}
                                          className="ui button primary basic tiny right floated">
                                      <i className="fa fa-gear" />
                                      {' 설정'}
                                    </Link>
                                  }

                                  {
                                    userId && isLogin &&
                                    <Dropdown className="subscribe_dropdown" ref="subscribe_dropdown">
                                      <DropdownTrigger className="ui button primary basic tiny right floated">
                                        <i className="fa fa-share" />
                                        {' 구독'}
                                      </DropdownTrigger>
                                      <DropdownContent>
                                        <h4>구독 컬렉션 선택</h4>
                                        <ul className="collection_list">
                                          {
                                            Users
                                              .get(userId.toString())
                                              .get('collections')
                                              .map(collectionId => {
                                                const collection = Collections.get(collectionId.toString());
                                                return (
                                                  <li key={collectionId} className="collection_item">
                                                    <div className="ui checkbox">
                                                      <input id={`collection-id-${collectionId}`}
                                                             type="checkbox"
                                                             value={collection.get('id')}
                                                             defaultChecked={self.checkCollectionHasForums(collection.get('forums'), forumId)}
                                                             onChange={self.selectCollection} />
                                                      <label htmlFor={`collection-id-${collectionId}`}>{collection.get('title')}</label>
                                                    </div>
                                                  </li>
                                                )
                                              })
                                          }
                                        </ul>
                                      </DropdownContent>
                                    </Dropdown>
                                  }

                                  {
                                    !userId && !isLogin &&
                                    <a onClick={self.openLoginModal} className="ui button primary basic tiny right floated">
                                      <i className="fa fa-share" />
                                      {' 구독'}
                                    </a>
                                  }

                                  <a className={cFollowActive} onClick={self.toggleFollow.bind(self, isUserForumFollow, forumId)}>
                                    <i className="fa fa-star" />
                                    {' 팔로우'}
                                  </a>
                                </div>
                                <div className="meta">
                                  {forum.get('sub_header')}
                                </div>
                                <div className="description">
                                  {forum.get('description')}
                                </div>
                                <div className="meta forum_meta" >
                                  <div className="forum_counts" >
                                    <span className="follow_counts" >팔로우 {forum.get('follow_count')} 명</span>
                                    <span className="subs_counts" >컬렉션 구독 {forum.get('subs_count')}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  }
                })
              }
            </ul>
          </div>
        </div>

        <SearchHeader posts={searchPosts}/>

        <InfiniteList
          PostIdList={ListStore.get('searchPostList')}
          PostItems={Posts}
          AuthorItems={Users}
          User={AuthStore}
          LoginModalFlag={LoginModalStore.get('openLoginModal')}
        />

        <Waypoint
          onEnter={this.getMoreBest}
          bottomOffset="-10%"
          scrollableAncestor={window || null}
        />

        <InfiniteLoader collection={Collection} />

      </div>
    )
  }
});

export default SearchBox;
