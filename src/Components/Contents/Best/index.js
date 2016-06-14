import React from 'react';

import BestList from './BestList';
import BestPagination from './BestPagination';
import PostActions from '../../../Actions/PostActions';

const BestContents = React.createClass({
  componentWillUnmount() {
    // some example callbacks
    $('#contents')
      .visibility('destroy');
    PostActions.resetBestPage();
  },
  componentDidMount() {
    const self = this;

    $('.ui.embed').embed();

    $('#contents')
      .visibility({
        once: false,
        observeChanges: true,
        onBottomVisible: function(calculations) {
          console.log('onBottomVisible', calculations);
          // top of element passed
          self.getMoreBest();
        }
      })
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },

  getMoreBest() {
    "use strict";

    const {BestPostStore, GnbStore} = this.props;
    const noMore = BestPostStore.get('noMore');
    const collection = BestPostStore.getIn(['posts', 'collection']);
    const currentPage = collection ? collection.get('current_page') : 1;
    const nextPage = collection ? collection.get('next_page') : 2;


    const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];
    const normalize = categoryValue.map((object, key) => {
      return parseInt(object.value);
    });

    if (!noMore) {
      PostActions.getBestPost({
        page: nextPage,
        categoryValue: (normalize.length > 0) ? normalize: null
      });
    }
  },

  render() {
    const {BestPostStore, LoginStore, UserStore} = this.props;
    const posts = BestPostStore.get('posts');
    const collection = BestPostStore.get('collection');
    const noMore = BestPostStore.get('noMore');

    return (
      <div id="best_contents" ref="best_contents">

        <BestList
          LoginStore={LoginStore}
          UserStore={UserStore}
          posts={posts}
        />

        {
          !noMore &&
          <BestPagination
            collection={collection}
          />
        }
      </div>
    )
  }
});

export default BestContents;
