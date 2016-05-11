import React from 'react';

import BestList from './BestList';
import BestPagination from './BestPagination';

const BestContents = React.createClass({
  componentDidMount() {
    $('.ui.embed').embed();
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed();
  },

  render() {
    const {BestPostStore} = this.props;
    const posts = BestPostStore.get('posts');
    const collection = BestPostStore.get('collection');

    return (
      <div id="best_contents">

        <BestList
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
