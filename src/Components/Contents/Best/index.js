import React from 'react';

import BestList from './BestList';
import BestPagination from './BestPagination';
import PostActions from '../../../Actions/PostActions';

const BestContents = React.createClass({
  componentWillUnmount() {
    // some example callbacks
    $('#contents')
      .visibility('destroy');
  },
  componentDidMount() {
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

          PostActions.getBestPost();
        },
        onBottomPassed: function(calculations) {
          console.log('onBottomPassed', calculations);
          // top of element passed
        },
        onPassed: {
          '40%': function(calculations) {
            console.log(40, calculations);
            // do something at 40%
          },
          '80%': function(calculations) {
            console.log(80, calculations);
            // do something at 80%
          }
        }
      });
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },

  render() {
    const {BestPostStore, LoginStore} = this.props;
    const posts = BestPostStore.get('posts');
    const collection = BestPostStore.get('collection');

    return (
      <div id="best_contents" ref="best_contents">

        <BestList
          LoginStore={LoginStore}
          posts={posts}
        />

        <BestPagination
          collection={collection}
        />
      </div>
    )
  }
});

export default BestContents;
