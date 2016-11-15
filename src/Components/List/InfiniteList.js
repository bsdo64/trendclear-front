import React, { PropTypes } from 'react';
import BigPost from '../PostItem/BigPost';
import './BestList.scss';

function createItem(props, id) {

  const { PostItems, AuthorItems, User } = props;

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
          FireSetScrollPosition={props.FireSetScrollPosition}
          FireToggleLoginModal={props.FireToggleLoginModal}
        />
      ]
    }
  }
}

const InfiniteList = React.createClass({
  displayName: 'InfiniteList',
  propTypes: {
    PostIdList: PropTypes.object,
    PostItems: PropTypes.object.isRequired,
    AuthorItems: PropTypes.object.isRequired,
    User: PropTypes.object.isRequired,
    scrollHeight: PropTypes.number.isRequired,
    FireSetScrollPosition: PropTypes.func.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired
  },
  defaultProps: {
    PostIdList: [],
    PostItems: {},
  },

  componentDidMount() {
    $('.ui.embed').embed();

    window.addEventListener('resize', this.setScroll)
  },

  setScroll() {
    const { scrollHeight } = this.props;
    document.body.scrollTop = scrollHeight;
  },

  componentDidUpdate() {
    $('.ui.embed').embed('refresh');
  },

  render() {
    const { PostIdList = [], PostItems = {}, AuthorItems, User } = this.props;
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

export default InfiniteList
