import React from 'react';

import BestPost from './BestPost';

require('./BestList.scss');
const BestList = React.createClass({
  render() {
    const { posts } = this.props;
    const postArray = posts.getIn(['postList', 'result']) || [];
    const createPostItem = function (itemId) {
      return <BestPost
        postList={posts.get('postList')}
        postId={itemId}
        key={itemId} styleClass="best_list_item"/>;
    };
    return (
      <div className="ui items best_list">
        {
          posts.get('data') &&
          posts.get('data').map(createPostItem)
        }
      </div>
    );
  }
});

export default BestList;