import React from 'react';

import BestList from './BestList';
import BestPagination from './BestPagination';
import PostActions from '../../../Actions/PostActions';
import GnbActions from '../../../Actions/GnbActions';

const BestContents = React.createClass({
  componentWillUnmount() {
    // some example callbacks
    window.removeEventListener('scroll', this.handleScroll);

    $('#contents').visibility('destroy');
    PostActions.resetBestPage();
    GnbActions.resetFilter();
  },
  componentDidMount() {
    $('.ui.embed').embed();
    window.addEventListener('scroll', this.handleScroll);
  },

  componentDidUpdate(prevProps, prevState) {
    $('#contents').visibility('refresh');
    $('.ui.embed').embed('refresh');
  },

  createBestPagination(noMore, collection) {
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

    const {BestPostStore, GnbStore} = this.props;
    const noMore = BestPostStore.get('noMore');
    const collection = BestPostStore.getIn(['posts', 'collection']);
    const currentPage = collection ? collection.get('current_page') : 1;
    const nextPage = collection.get('next_page');


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

  handleScroll(event) {

    function getDocHeight() {
      var D = document;
      return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
      );
    }

    if($(window).scrollTop() + $(window).height() == getDocHeight(event.srcElement)) {
      this.getMoreBest();
    }
  },

  render() {
    const {BestPostStore, LoginStore, UserStore} = this.props;
    const posts = BestPostStore.get('posts');
    const noMore = BestPostStore.get('noMore');
    const collection = BestPostStore.getIn(['posts', 'collection']);

    return (
      <div id="best_contents" >

        <BestList
          LoginStore={LoginStore}
          UserStore={UserStore}
          posts={posts}
        />

        {
          this.createBestPagination(noMore, collection)
        }
      </div>
    )
  }
});

export default BestContents;
