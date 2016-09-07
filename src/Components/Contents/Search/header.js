import React from 'react';

const SearchHeader = React.createClass({
  displayName: 'SearchHeader',
  render() {
    "use strict";
    const {posts, postList} = this.props;
    if (posts) {
      const postData = posts.get('posts');
      const total = postData.get('total') ? postData.get('total'): 0;

      return (
        <div className="search-header">
          검색 결과 {total}개
        </div>
      );
    }

    return <div></div>
  }
});

export default SearchHeader;