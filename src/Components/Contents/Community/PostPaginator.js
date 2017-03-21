import React, { PropTypes } from 'react';

const PostPaginator = React.createClass({
  displayName: 'PostPaginator',
  propTypes: {
    Users: PropTypes.object.isRequired,
    Posts: PropTypes.object.isRequired,
    ListStore: PropTypes.object.isRequired,
  },

  render() {

    const {Posts, ListStore} = this.props;

    const postId = ListStore.get('CurrentPostId');
    if (postId) {
      const post = Posts.get(postId.toString());

      if (post) {

        return <div style={{}}>
          Hello1
        </div>;

      } else {
        return <div></div>;
      }
    } else {
      return <div></div>;
    }
  },
});

export default PostPaginator;
