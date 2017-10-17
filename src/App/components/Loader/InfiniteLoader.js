import React from 'react';
import PropTypes from 'prop-types';

const InfiniteLoader = ({collection, location}) => {
  let message;
  if (location && location.pathname === '/search') {
    message = '더이상 표시할 게시물이 없습니다'
  } else {
    message = '더이상 표시할 추천 게시물이 없습니다';
  }

  if (collection && collection.get('next_page')) {
    return (
      <div className="ui items">
        <div className="ui item load_more_loading">
          <div className="ui text active loader inline centered"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="no-more-post">
        <div className="alert">
          {message}
        </div>
      </div>
    );
  }
};

InfiniteLoader.propTypes = {
  collection: PropTypes.object,
  location: PropTypes.object,
};

export default InfiniteLoader;
