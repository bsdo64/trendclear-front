import React from 'react';
import PropTypes from 'prop-types';

const SearchHeader = props => {
  const { posts } = props;
  if (posts) {
    const postData = posts.get('posts');
    const total = postData.get('total') ? postData.get('total') : 0;

    return (
      <h4 className="header post">
        {total}개의 포스트
      </h4>
    );
  }

  return <div></div>;
};

SearchHeader.displayName = 'SearchHeader';
SearchHeader.propTypes = {
  posts: PropTypes.object,
};

export default SearchHeader;
