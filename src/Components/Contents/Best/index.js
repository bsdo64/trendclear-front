import React from 'react';

import InfiniteList from './InfiniteList';
import BestPagination from './BestPagination';
import PostActions from '../../../Actions/PostActions';
import GnbActions from '../../../Actions/GnbActions';

const BestBox = React.createClass({
  componentWillUnmount() {
    // some example callbacks
    window.removeEventListener('scroll', this.handleScroll);

    PostActions.resetBestPage();
    GnbActions.resetFilter();
  },
  componentDidMount() {
    $('.ui.embed').embed();
    window.addEventListener('scroll', this.handleScroll);
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },

  createBestPagination(collection) {
    "use strict";

    if (collection && collection.get('next_page')) {
      return <BestPagination  collection={collection}/>;
    } else {
      return (
        <div className="no-more-post">
          <div className="alert">
            더이상 표시할 추천 게시물이 없습니다
          </div>
        </div>
      )
    }
  },

  getMoreBest() {
    "use strict";

    const {PaginationStore, GnbStore} = this.props;
    const Pagination = PaginationStore.get('bestPostList');
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
  },

  _getDocHeight(D) {
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  },
  handleScroll(event) {
    if($(window).scrollTop() + $(window).height() == this._getDocHeight(event.srcElement || event.target)) {
      this.getMoreBest();
    }
  },

  render() {
    const {ListStore, Posts, Users, AuthStore, PaginationStore, LoginModalStore} = this.props;
    const Pagination = PaginationStore.get('bestPostList');

    return (
      <div id="best_contents" >

        <InfiniteList
          PostIdList={ListStore.get('bestPostList')}
          PostItems={Posts}
          AuthorItems={Users}
          User={AuthStore}
          LoginModalFlag={LoginModalStore.get('openLoginModal')}
        />

        {
          this.createBestPagination(Pagination)
        }
      </div>
    )
  }
});

export default BestBox;
