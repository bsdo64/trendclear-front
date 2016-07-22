import React from 'react';
import BigPost from '../PostItem/BigPost';

if (process.env.browser === true) {
  require('./BestList.scss');
}

function createItem(props, id) {
  "use strict";

  const {PostItems, AuthorItems, User, LoginModalFlag} = props;

  const post = PostItems.get(id.toString());
  if (post) {
    const author = AuthorItems.get(post.get('author').toString());

    if (author) {
      const user = User.get('userId') ? AuthorItems.get(User.get('userId').toString()) : null;

      return (
        <BigPost
          key={id}
          author={author}
          post={post}
          user={user}
          loginModalFlag={LoginModalFlag}
        />
      )
    }
  }
}

module.exports = (props) => {

  const {PostIdList = [], PostItems = {}, AuthorItems, User} = props;
  const okey = !!(PostItems.size && AuthorItems.size && User.size);

  return (
    <div className="ui items best_list">
      {
        okey &&
        PostIdList.map(createItem.bind(null, props))
      }
    </div>
  )
};