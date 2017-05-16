import React from 'react';
import PropTypes from 'prop-types';
import BigPost from '../../PostItem/BigPost.js';
import Forum from './Forum.js';
import CommentBox from '../../CommentBox/index.js';

class PostPage extends React.Component {
  componentDidMount() {
    $('.ui.embed').embed();
  }

  componentDidUpdate() {
    $('.ui.embed').embed('refresh');
  }

  render() {

    const { Comments, SubComments, Users, Posts, ListStore, AuthStore } = this.props;

    const postId = ListStore.get('CurrentPostId');
    if (postId) {
      const post = Posts.get(postId.toString());

      if (post) {

        if (post.get('deleted')) {
          return (
            <div id="post_box" className="ui items">

              <div style={{ padding: 50 }}>
                <h2 className="ui center aligned icon">
                  <i className="bordered ban icon"/>
                  페이지를 찾을 수 없습니다.
                </h2>
              </div>

              <Forum
                {...this.props}
              />
            </div>
          );
        }

        const author = Users.get(post.get('author').toString());
        const user = AuthStore.get('userId') ? Users.get(
          String(AuthStore.get('userId'))) : null;

        return (
          <div id="post_box" className="ui items">

            {
              post &&
              <BigPost
                author={author}
                post={post}
                user={user}
                postStyle="post_item"
                view={true}
                shorten={false}
                {...this.props}
              />
            }

            {
              post &&
              <CommentBox
                post={post}
                comments={Comments}
                subComments={SubComments}
                authors={Users}
                {...this.props}
              />
            }

            {/*<PostPaginator {...this.props} />*/}

            <Forum
              {...this.props}
            />
          </div>
        );
      } else {
        return <div></div>;
      }
    } else {
      return <div></div>;
    }
  }
}

PostPage.displayName = 'PostPage';
PostPage.propTypes = {
  Comments: PropTypes.object.isRequired,
  SubComments: PropTypes.object.isRequired,
  Users: PropTypes.object.isRequired,
  Posts: PropTypes.object.isRequired,
  ListStore: PropTypes.object.isRequired,
  AuthStore: PropTypes.object.isRequired,
  FireSetScrollPosition: PropTypes.func.isRequired,
  FireToggleLoginModal: PropTypes.func.isRequired,
  FireToggleReportModal: PropTypes.func.isRequired,
  FireToggleDeleteModal: PropTypes.func.isRequired,
  FireRequestLikePost: PropTypes.func.isRequired,
  FireRequestLikeComment: PropTypes.func.isRequired,
  FireRequestLikeSubComment: PropTypes.func.isRequired,
  FireRequestSubmitComment: PropTypes.func.isRequired,
  FireRequestSubmitSubComment: PropTypes.func.isRequired,
  FireRequestUpdateComment: PropTypes.func.isRequired,
  FireRequestUpdateSubComment: PropTypes.func.isRequired,
  FireCloseCommentUpdateView: PropTypes.func.isRequired,
  FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
  FireRequestActivateVenalink: PropTypes.func.isRequired,
  FireRequestParticipateVenalink: PropTypes.func.isRequired,
};

export default PostPage;
