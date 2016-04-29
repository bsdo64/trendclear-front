import React from 'react';

import BestPost from './BestPost';

require('./BestList.scss');
const BestList = React.createClass({
  render() {
    const { posts } = this.props;
    const createPostItem = function (item) {
      return <BestPost post={item} key={item.get('id')} styleClass="best_list_item"/>;
    };

    return (
      <div className="ui items best_list">
        {
          posts.get('data').map(createPostItem)
        }
      </div>
    );
  }
});

export default BestList;