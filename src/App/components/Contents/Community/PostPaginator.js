import React from 'react';
import PropTypes from 'prop-types';

const PostPaginator = props => {
  const {Posts, ListStore} = props;

  const postId = ListStore.get('CurrentPostId');
  if (postId) {
    const post = Posts.get(postId.toString());

    if (post) {

      return <div style={{}}>
        Hello1
      </div>;

    } else {
      return <div/>;
    }
  } else {
    return <div/>;
  }
};

PostPaginator.displayName = 'PostPaginator';
PostPaginator.propTypes = {
  Users: PropTypes.object.isRequired,
    Posts: PropTypes.object.isRequired,
    ListStore: PropTypes.object.isRequired,
};

export default PostPaginator;
