import React from 'react';

import BestPost from './BestPost';

require('./BestList.scss');
const BestList = React.createClass({
  render() {
    const { posts, LoginStore } = this.props;
    const postList = posts ? posts.get('postList') : undefined;
    const postArray = postList ? postList.get('result') : [];
    const createPostItem = function (itemId) {
      return <BestPost
        LoginStore={LoginStore}
        postList={postList}
        postId={itemId}
        key={itemId} styleClass="best_list_item"/>;
    };
    return (
      <div className="ui items best_list">
        {
          postArray.map(createPostItem)
        }
      </div>
    );
  }
});

export default BestList;