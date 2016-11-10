import React from 'react';
import BigPost from '../PostItem/BigPost';
import Main1 from '../Ad/Main1';
import './BestList.scss';

function createItem(props, id) {
  "use strict";

  const {PostItems, AuthorItems, User} = props;

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
          view={false}
          shorten={true}
          setScrollPosition={props.setScrollPosition}
        />
      ]
    }
  }
}

module.exports = React.createClass({

  componentDidMount() {
    $('.ui.embed').embed();

    window.addEventListener('resize', this.setScroll)
  },

  setScroll() {
    const {scrollHeight} = this.props;
    document.body.scrollTop = scrollHeight;
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },

  render() {
    const {PostIdList = [], PostItems = {}, AuthorItems, User} = this.props;
    const okey = !!(PostItems.size && AuthorItems.size && User.size);

    return (
      <div className="ui items best_list">

        {/*<Main1 url={'http://www.computerhope.com/banners/banner3.gif'} />*/}

        {
          okey &&
          PostIdList.map(createItem.bind(null, this.props))
        }
      </div>
    )
  }
});
