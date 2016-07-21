import React from 'react';
import Waypoint from 'react-waypoint';

import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';

import PostActions from '../../../Actions/PostActions';
import GnbActions from '../../../Actions/GnbActions';

const SearchBox = React.createClass({
  componentWillUnmount() {
    // some example callbacks

    PostActions.resetBestPage();
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

    const {PaginationStore, SearchStore} = this.props;
    const Pagination = PaginationStore.get('searchPostList');
    if (Pagination) {
      const nextPage = Pagination.get('next_page');

      if (nextPage) {
        PostActions.getSearchPost({
          page: nextPage,
          query: SearchStore.get('query')
        });
      }
    }
  },

  render() {
    const {ListStore, Posts, Users, AuthStore, PaginationStore, LoginModalStore} = this.props;
    const Collection = PaginationStore.get('searchPostList');

    return (
      <div id="best_contents" >

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
