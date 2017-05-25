import React from 'react';
import PropTypes from 'prop-types';

const SearchHeader = props => {
  const { posts } = props;
  if (posts) {
    const postData = posts.get('posts');
    const total = postData.get('total') ? postData.get('total') : 0;

    return (
      <div className="search-header">
        포스트 {total}개
      </div>
    );
  }

  return <div></div>;
};

SearchHeader.displayName = 'SearchHeader';
SearchHeader.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default SearchHeader;
