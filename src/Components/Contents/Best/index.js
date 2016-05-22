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
        onTopVisible: function(calculations) {
          console.log('onTopVisible', calculations);
          // top is on screen
        },
        onTopPassed: function(calculations) {
          console.log('onTopPassed', calculations);
          // top of element passed
        },
        onBottomVisible: function(calculations) {
          console.log('onBottomVisible', calculations);
          // top of element passed
          self.getMoreBest();
        },
        onBottomPassed: function(calculations) {
          console.log('onBottomPassed', calculations);
          // top of element passed
        }
      })
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },

  getMoreBest() {
    "use strict";

    const {BestPostStore} = this.props;
    const noMore = BestPostStore.get('noMore');
    const collection = BestPostStore.getIn(['posts', 'collection']);
    const currentPage = collection ? collection.get('current_page') : 1;
    const nextPage = collection ? collection.get('next_page') : 2;

    if (!noMore) {
      PostActions.getBestPost({page: nextPage});
    }
  },

  render() {
    const {BestPostStore, LoginStore} = this.props;
    const posts = BestPostStore.get('posts');
    const collection = BestPostStore.get('collection');
    const noMore = BestPostStore.get('noMore');

    return (
      <div id="best_contents" ref="best_contents">

        <BestList
          LoginStore={LoginStore}
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
