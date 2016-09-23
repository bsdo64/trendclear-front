import React from 'react';
import BigPost from '../PostItem/BigPost';
import Main1 from '../Ad/Main1';
import './BestList.scss';

function createItem(props, id) {
  "use strict";

  const {PostItems, AuthorItems, User, LoginModalFlag} = props;

  const post = PostItems.get(id.toString());
  if (post) {
    const author = AuthorItems.get(post.get('author').toString());

    if (author) {
      const user = User.get('userId') ? AuthorItems.get(User.get('userId').toString()) : null;

      return [
        <BigPost
          key={id}
          author={author}
          post={post}
          user={user}
          loginModalFlag={LoginModalFlag}
          view={false}
        />
      ]
    }
  }
}

module.exports = (props) => {

  const {PostIdList = [], PostItems = {}, AuthorItems, User} = props;
  const okey = !!(PostItems.size && AuthorItems.size && User.size);

  return (
    <div className="ui items best_list">

      {/*<Main1 url={'http://www.computerhope.com/banners/banner3.gif'} />*/}

      {
        okey &&
        PostIdList.map(createItem.bind(null, props))
      }
    </div>
  )
};