import React, { PropTypes } from 'react';

import BestPost from '../../PostItem/BigPost';
import Forum from './Forum';
import CommentBox from '../../CommentBox';

require('./Post.scss');
const PostPage = React.createClass({
  displayName: 'PostPage',
  propTypes: {
    Comments: PropTypes.object.isRequired,
    SubComments: PropTypes.object.isRequired,
    Users: PropTypes.object.isRequired,
    Posts: PropTypes.object.isRequired,
    ListStore: PropTypes.object.isRequired,
    AuthStore: PropTypes.object.isRequired,
    FireSetScrollPosition: PropTypes.func.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,

  },

  componentDidMount() {
    $('.ui.embed').embed();
  },

  componentDidUpdate() {
    $('.ui.embed').embed('refresh');
  },

  render() {

    const { Comments, SubComments, Users, Posts, ListStore, AuthStore } = this.props;

    const postId = ListStore.get('CurrentPostId');
    if (postId) {
      const post = Posts.get(postId.toString());

      if (post) {

        if (post.get('deleted')) {
          return (
            <div id="post_box" className="ui items">

              <div style={{ padding: 15 }}>
                <h2 className="ui center aligned icon">
                  <i className="bordered ban icon"/>
                  페이지를 찾을 수 없습니다.
                </h2>
              </div>

              <Forum
                {...this.props}
              />
            </div>
          )
        }

        const author = Users.get(post.get('author').toString());
        const user = AuthStore.get('userId') ? Users.get(String(AuthStore.get('userId'))) : null;

        return (
          <div id="post_box" className="ui items">

            {
              post &&
              <BestPost
                author={author}
                post={post}
                user={user}
                postStyle="post_item"
                view={true}
                shorten={false}
                FireSetScrollPosition={this.props.FireSetScrollPosition}
                FireToggleLoginModal={this.props.FireToggleLoginModal}
                FireToggleReportModal={this.props.FireToggleReportModal}
              />
            }

            {
              post &&
              <CommentBox
                {...this.props}
                post={post}
                comments={Comments}
                subComments={SubComments}
                authors={Users}
                FireToggleReportModal={this.props.FireToggleReportModal}
                FireToggleLoginModal={this.props.FireToggleLoginModal}
              />
            }

            <Forum
              {...this.props}
            />
          </div>
        )
      } else {
        return <div></div>
      }
    } else {
      return <div></div>
    }
  }
});

export default PostPage;