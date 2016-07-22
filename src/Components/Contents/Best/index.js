import React from 'react';
import Waypoint from 'react-waypoint';

import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';
import PostActions from '../../../Actions/PostActions';
import GnbActions from '../../../Actions/GnbActions';

const BestBox = React.createClass({
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

    const {PaginationStore, GnbStore} = this.props;
    const Pagination = PaginationStore.get('bestPostList');
    if (Pagination) {
      const nextPage = Pagination.get('next_page');

      const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];
      const normalize = categoryValue.map((object, key) => {
        return parseInt(object.value);
      });

      if (nextPage) {
        PostActions.getBestPost({
          page: nextPage,
          categoryValue: (normalize.length > 0) ? normalize: null
        });
      }
    }
  },

  render() {
    const {ListStore, Posts, Users, AuthStore, PaginationStore, LoginModalStore} = this.props;
    const Collection = PaginationStore.get('bestPostList');

    return (
      <div id="best_contents" >

        <InfiniteList
          PostIdList={ListStore.get('bestPostList')}
          PostItems={Posts}
          AuthorItems={Users}
          User={AuthStore}
          LoginModalFlag={LoginModalStore.get('openLoginModal')}
        />

        <Waypoint
          onEnter={this.getMoreBest}
          bottomOffset='-10%'
          scrollableAncestor={process.env.browser ? window : null}
        />

        <InfiniteLoader collection={Collection} />

      </div>
    )
  }
});

export default BestBox;
