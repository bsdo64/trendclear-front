import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { browserHistory } from 'react-router';
import LoginActions from '../../../Actions/LoginActions';
import CommentActions from '../../../Actions/CommentActions';
import CommunityActions from '../../../Actions/CommunityActions';
import BestPost from '../../PostItem/BigPost';
import Paginator from '../../Paginator';
import Menu from '../../PostItem/ReportMenu';
import MakeUrl from '../../Lib/MakeUrl';
import AvatarImage from '../../AvatarImage';
import Forum from './Forum';

const commentMediumConfig = {
  toolbar: false,
  disableDoubleReturn: true,
  placeholder: {
    /* This example includes the default options for placeholder,
     if nothing is passed this is what it used */
    text: '여기에 댓글을 입력하세요',
    hideOnClick: true
  },
  imageDragging: false,
  targetBlank: true,
  autoLink: true
};

function removeWhiteSpace(text) {
  return text
    .replace(/\n\s*\n/g, '\n') // removedLine
    .replace(/\s{2,}/g, ' ') // removedWhite
    .replace(/ ?&nbsp; ?|\t+/g, ''); // removedNbsp
}

function checkSkillAvailable(skill) {

  const property = skill.getIn(['skill', 'property']);
  const cooltime = property.get('cooltime');
  const usingAt = skill.get('using_at');

  if (usingAt === null) {
    return true;
  }

  if (cooltime && usingAt) {
    const gapSec = (new Date() - new Date(usingAt));
    if (gapSec > cooltime * 1000) {
      return true;
    }
  }

  return false;
}

function closeUpdateComment() {

  CommunityActions.closeUpdateComment();
}

function sendSubCommentLike(props) {
  const { location, isLogin, subCommentId } = props;
  return function createSendSubCommentLike() {
    if (!isLogin) {
      LoginActions.toggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    } else {
      CommentActions.likeSubComment(subCommentId);
    }
  }
}

function subCommentItem(props) {
  return function createSubCommentItem(subCommentId) {
    return <SubCommentItem key={subCommentId} {...props} subCommentId={subCommentId}/>
  }
}

const SubCommentItem = React.createClass({
  displayName: 'SubCommentItem',
  propTypes: {
    LoginStore: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    updating: PropTypes.object.isRequired,
    subComments: PropTypes.object.isRequired,
    authors: PropTypes.object.isRequired,
    subCommentId: PropTypes.object.isRequired,
    userId: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  },

  componentDidUpdate(prevProps) {
    const oldUpdating = prevProps.updating;
    const { updating } = this.props;
    if ((oldUpdating.id !== updating.id)) {
      if ((oldUpdating.type !== updating.type) && (updating.type === 'subComment')) {
        if (oldUpdating.updating !== updating) {
          if (this.editor) {
            this.editor.destroy();
          }
          this.editor = new MediumEditor(this.refs.sub_comment_content_update, commentMediumConfig);
        }
      }
    }
  },

  updateSubComment(commentId) {

    const { LoginStore, UserStore } = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {
      const skills = UserStore.get('skills');
      const writePost = skills
        .filter(skill => skill.getIn(['skill', 'name']) === 'write_sub_comment')
        .get(0);

      const result = checkSkillAvailable(writePost);

      if (result) {
        const allContents = this.editor.serialize();
        const el = allContents['sub_comment_content_update'].value;
        if ($(el).text().trim()) {
          const comment = {
            id: commentId,
            content: removeWhiteSpace(el)
          };

          CommentActions.updateSubComment(comment);
        } else {
          console.log('Input sub comment');
        }
      } else {
        console.log('not available');
      }
    } else {
      const { location } = this.props;
      LoginActions.toggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    }
  },

  render() {
    const { subComments, authors, subCommentId, userId, updating } = this.props;
    const subComment = subComments.get(subCommentId.toString());

    if (subComment) {
      const subCommentAuthor = authors.get(subComment.get('author').toString());

      if (subCommentAuthor) {
        const commentDeleted = subComment.get('deleted');
        const subCommentSex = subCommentAuthor.getIn(['profile', 'sex']),
          sub_avatar_img = subCommentAuthor.getIn(['profile', 'avatar_img']),
          sub_icon_img = subCommentAuthor.getIn(['icon', 0, 'iconDef', 'icon_img']);
        let subIconImg;

        if (sub_icon_img) {
          subIconImg = <img className="user_icon_img" src={'/images/' + sub_icon_img}/>;
        }

        let contents;
        if (updating.type === 'subComment' && updating.updating && updating.id === subComment.get('id')) {
          contents = (
            <form className="ui reply form sub_comment_form">
              <div className="field update">
                <div
                  id={"sub_comment_content_update"}
                  ref={"sub_comment_content_update"}
                  className="comment_input sub_comment_input"
                  dangerouslySetInnerHTML={{ __html: subComment.get('content') }}
                ></div>
              </div>
              <div className="ui primary submit icon button" onClick={this.updateSubComment.bind(this, subCommentId)}>
                <i className="icon edit"/>
              </div>
              <div
                className="ui submit icon button close_update"
                onClick={closeUpdateComment}
              >
                <i className="icon remove circle outline"/>
              </div>
            </form>
          )
        } else if (commentDeleted) {
          contents = (
            <div>
              [삭제된 글입니다]
            </div>
          )

        } else {
          contents = (
            <div
              className="comment_text"
              dangerouslySetInnerHTML={{ __html: subComment.get('content') }}
            ></div>
          )
        }

        return (
          <div className="comment"
               key={subComment.get('id')}>
            <a className="avatar">
              <AvatarImage
                sex={subCommentSex}
                avatarImg={sub_avatar_img}
              />
            </a>
            <div className="content">
              <a className="author">{subCommentAuthor.get('nick')}</a>
              {subIconImg}
              <div className="metadata">
                <span className="date">{subComment.get('created_at')}</span>
              </div>
              <div className="text">
                {contents}
              </div>
              <div className="actions">
                {
                  commentDeleted &&
                  <div className="like_box">
                    <div className={'like_icon'}>
                      <i className={'disabled heart outline icon'}/>
                    </div>
                    <a className="like_count">{subComment.get('like_count')}</a>
                  </div>
                }
                {
                  !commentDeleted &&
                  <div className="like_box">
                    <div className={'like_icon ' + (subComment.get('liked') ? 'active' : '')}
                         onClick={sendSubCommentLike(this.props)}>
                      <i className={'heart ' + (subComment.get('liked') ? '' : 'outline') + ' icon'}/>
                    </div>
                    <a className="like_count">{subComment.get('like_count')}</a>
                  </div>
                }
                <div className="report_box">
                  {
                    !commentDeleted &&
                    <Menu
                      isUser={userId === subCommentAuthor.get('id')}
                      targetType="subComment"
                      targetId={subComment.get('id')}
                    />
                  }
                </div>
              </div>

            </div>
          </div>
        )
      }
    }

    return (<div key={userId}></div>)

  }
});

const CommentItem = React.createClass({
  displayName: 'CommentItem',
  propTypes: {
    LoginStore: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    updating: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    commentAuthor: PropTypes.object.isRequired,
    subCommentList: PropTypes.object.isRequired,
    authors: PropTypes.object.isRequired,
    subComments: PropTypes.object.isRequired,
  },
  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      subCommentOpen: false,
      liked: false,
      focus: false
    };
  },

  componentDidUpdate(prevProps) {
    const oldUpdating = prevProps.updating;
    const { updating } = this.props;
    if ((oldUpdating.id !== updating.id)) {
      if ((oldUpdating.type !== updating.type) && (updating.type === 'comment')) {
        if (oldUpdating.updating !== updating) {
          if (this.editor) {
            this.editor.destroy();
          }
          this.editor = new MediumEditor(this.refs.comment_content_update, commentMediumConfig);
        }
      }
    }
  },

  show() {

    this.setState({ focus: true })
  },

  close() {

    this.setState({ focus: false })
  },

  sendLike() {

    const { LoginStore } = this.props;
    const isLogin = LoginStore.get('isLogin');
    if (!isLogin) {
      LoginActions.toggleLoginModal({
        contentType: 'Login',
        location: '/'
      });
    } else {
      CommentActions.likeComment(this.props.comment.get('id'));
    }
  },

  toggleSubComment() {
    this.setState({ subCommentOpen: !this.state.subCommentOpen }, () => {

      const commentId = this.props.comment.get('id');
      const subCommentOpen = this.state.subCommentOpen;
      this.editor = new MediumEditor(this.refs['sub_comment_content_' + commentId], commentMediumConfig);
    });
  },

  submitSubComment(commentId) {

    const { LoginStore, UserStore } = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {
      const skills = UserStore.get('skills');
      const writePost = skills
        .filter((skill) => skill.getIn(['skill', 'name']) === 'write_sub_comment')
        .get(0);

      const result = checkSkillAvailable(writePost);

      if (result) {
        const allContents = this.editor.serialize();
        const el = allContents['sub_comment_input_' + commentId].value;
        if ($(el).text().trim()) {
          const comment = {
            content: removeWhiteSpace(el),
            commentId: commentId
          };

          CommentActions.submitSubComment(comment);
          this.editor.setContent('');
        } else {
          console.log('Input sub comment');
        }
      } else {
        console.log('not available');
      }
    } else {
      const location = this.props.location;
      LoginActions.toggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    }
  },

  updateComment() {
    const { LoginStore, UserStore, updating } = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin && updating.updating) {

      const skills = UserStore.get('skills');
      const writePost = skills
        .filter((skill) => skill.getIn(['skill', 'name']) === 'write_comment')
        .get(0);

      const result = checkSkillAvailable(writePost);

      if (result) {
        const allContents = this.editor.serialize();
        const el = allContents['comment_input_update'].value;

        if ($(el).text().trim()) {
          const comment = {
            id: updating.id,
            content: removeWhiteSpace(el),
            postId: this.props.location.query.postId
          };

          CommentActions.updateComment(comment);
          this.editor.destroy();
        } else {
          console.log('Input comment');
        }
      } else {
        console.log('not available');
      }
    } else {
      const location = this.props.location;
      LoginActions.toggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    }
  },

  render() {

    const { LoginStore, UserStore, updating } = this.props;
    const isLogin = LoginStore.get('isLogin');

    let userId;
    if (isLogin) {
      userId = UserStore.getIn(['user', 'id'])
    }

    const { comment, commentAuthor, subCommentList, authors, subComments, location } = this.props;
    const subCommentOpen = this.state.subCommentOpen;
    const commentDeleted = comment.get('deleted');

    const sex = commentAuthor.getIn(['profile', 'sex']),
      avatar_img = commentAuthor.getIn(['profile', 'avatar_img']),
      icon_img = commentAuthor.getIn(['icon', 0, 'iconDef', 'icon_img']);
    let iconImg;

    if (icon_img) {
      iconImg = <img className="user_icon_img" src={'/images/' + icon_img}/>;
    }

    const subCommentProps = {
      authors: authors,
      subComments: subComments,
      location: location,
      updating: updating,
      isLogin: isLogin,
      userId: userId,
      commentAuthor: commentAuthor,
      commentId: comment.get('id'),
      LoginStore,
      UserStore,
      editor: this.editor
    };

    let contents;
    if (updating.type === 'comment' && updating.updating && updating.id === comment.get('id')) {
      contents = (
        <form className="ui reply form ">
          <div className="field">
            <div
              id="comment_input_update"
              ref="comment_content_update"
              className="comment_input"
              dangerouslySetInnerHTML={{ __html: comment.get('content') }}
            >
            </div>
          </div>
          <div
            className="ui primary submit icon button"
            onClick={this.updateComment}
          >
            <i className="icon edit"/>
          </div>
          <div
            className="ui submit icon button close_update"
            onClick={closeUpdateComment}
          >
            <i className="icon remove circle outline"/>
          </div>
        </form>
      )
    } else if (commentDeleted) {
      contents = (
        <div>
          [삭제된 글입니다]
        </div>
      )
    } else {
      contents = (
        <div
          className="comment_text"
          dangerouslySetInnerHTML={{ __html: comment.get('content') }}
        ></div>
      )
    }

    return (
      <div className="comment"
           key={comment.get('id')}
           onMouseEnter={this.show}
           onMouseLeave={this.close}>
        <a className="avatar">
          <AvatarImage
            sex={sex}
            avatarImg={avatar_img}
          />
        </a>
        <div className="content">
          <a className="author">{commentAuthor.get('nick')}</a>
          {iconImg}
          <div className="metadata">
            <div className="date">{comment.get('created_at')}</div>
          </div>
          <div className="text">
            {contents}
          </div>
          <div className="actions">
            {
              !commentDeleted &&
              <div className="like_box" onClick={this.sendLike}>
                <div className={'like_icon ' + (comment.get('liked') ? 'active' : '')}>
                  <i className={'heart ' + (comment.get('liked') ? '' : 'outline') + ' icon'}/>
                </div>
                <a className="like_count">{comment.get('like_count')}</a>
              </div>
            }

            {
              commentDeleted &&
              <div className="like_box disabled">
                <div className={'like_icon'}>
                  <i className={'disabled heart outline icon'}/>
                </div>
                <a className="like_count">{comment.get('like_count')}</a>
              </div>
            }

            <div className="comment_box" onClick={this.toggleSubComment}>
              <div className="comment_icon">
                <i className="edit outline icon"/>
              </div>
              <a className="comment_count">{comment.get('sub_comment_count')}</a>
            </div>
            <div className="report_box">
              {
                !commentDeleted &&
                <Menu
                  isUser={userId === commentAuthor.get('id')}
                  targetType="comment"
                  targetId={comment.get('id')}
                />
              }
            </div>
          </div>
          {
            subCommentOpen && (subCommentList.size > 0) &&
            <div className="comments">
              {subCommentList.map(subCommentItem(subCommentProps))}
            </div>
          }

          {
            subCommentOpen && !commentDeleted &&
            <form className="ui reply form sub_comment_form">
              <div className="field">
                <div
                  id={"sub_comment_input_" + comment.get('id')}
                  ref={"sub_comment_content_" + comment.get('id')}
                  className="comment_input sub_comment_input"
                ><p><br /></p></div>
              </div>
              <div className="ui primary submit icon button"
                   onClick={this.submitSubComment.bind(this, comment.get('id'))}>
                <i className="icon edit"/>
              </div>
            </form>
          }
        </div>
      </div>
    )

  }
});

const CommentList = React.createClass({
  displayName: 'CommentList',
  propTypes: {
    commentList: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    authors: PropTypes.object.isRequired,
    subComments: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    LoginStore: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updating: PropTypes.object.isRequired,
  },

  render() {
    const { commentList, comments, authors, subComments, UserStore, LoginStore, location, updating } = this.props;

    let commentsNode = commentList.map(function (commentId) {
      const comment = comments.get(commentId.toString());

      if (comment) {
        const commentAuthor = authors.get(comment.get('author').toString());

        if (commentAuthor) {
          const subCommentList = comment.get('subComments');

          return (
            <CommentItem
              LoginStore={LoginStore}
              UserStore={UserStore}
              key={commentId}
              comment={comment}
              commentAuthor={commentAuthor}
              authors={authors}
              subComments={subComments}
              location={location}
              subCommentList={subCommentList}
              updating={updating}
            />
          )
        }
      }

      return (<div key={commentId}></div>)
    });
    return (
      <div className="comment_list">
        {commentsNode}
      </div>
    )
  }
});

require('./Comment.scss');
const CommentBox = React.createClass({
  displayName: 'CommentBox',
  propTypes: {
    location: PropTypes.object.isRequired,
    LoginStore: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    subComments: PropTypes.object.isRequired,
    authors: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    CommunityStore: PropTypes.object.isRequired,
  },

  //mixins: [PureRenderMixin],

  componentDidMount() {
    this.editor = new MediumEditor(this.refs.comment_content, commentMediumConfig);
  },

  componentDidUpdate() {
    this.editor.destroy();

    this.editor = new MediumEditor(this.refs.comment_content, commentMediumConfig);
  },

  handleSetPage(pagination) {
    const makeUrl = new MakeUrl(this.props.location);
    browserHistory.push(makeUrl.setQuery('comment_p', pagination.page));
  },

  submitComment() {

    const { LoginStore, UserStore, location } = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {

      const skills = UserStore.get('skills');
      const writePost = skills
        .filter((skill) => skill.getIn(['skill', 'name']) === 'write_comment')
        .get(0);

      const result = checkSkillAvailable(writePost);

      if (result) {
        const allContents = this.editor.serialize();
        const el = allContents['comment_input'].value;

        if ($(el).text().trim()) {
          const comment = {
            content: removeWhiteSpace(el),
            postId: location.query.postId
          };

          CommentActions.submitComment(comment);
          this.editor.setContent('');
        } else {
          console.log('Input comment');
        }
      } else {
        console.log('not available');
      }
    } else {
      const location = location;
      LoginActions.toggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    }
  },

  render() {
    const {
      LoginStore, UserStore, location, comments, subComments, authors, post, CommunityStore
    } = this.props;
    const commentList = post.get('comments');
    const updating = {
      updating: CommunityStore.get('updating'),
      type: CommunityStore.get('updateType'),
      id: CommunityStore.get('updateId')
    };

    if (commentList) {

      const commentPage = location.query.comment_p ? location.query.comment_p : 1;
      const commentLength = post.get('comment_count');

      return (
        <div id="comment_box" className="ui comments">

          <div className="comment_header">
            <div className="comment_count">댓글 {commentLength}개</div>
            <ul className="comment_sort_box">
              <li>최신순</li>
              {/* <li>좋아요순</li>*/}
              {/*<li>댓글순</li>*/}
            </ul>
          </div>
          <form className="ui reply form ">
            <div className="field">
              <div
                id="comment_input"
                ref="comment_content"
                className="comment_input"
              ><p><br /></p></div>
            </div>
            <div
              className="ui primary submit icon button"
              onClick={this.submitComment}
            >
              <i className="icon edit"/>
            </div>
          </form>

          <CommentList
            LoginStore={LoginStore}
            UserStore={UserStore}
            location={location}
            commentList={commentList}
            authors={authors}
            comments={comments}
            subComments={subComments}
            updating={updating}
          />

          <div className="ui center aligned container">
            { (commentLength > 0) &&
            <Paginator
              total={commentLength}
              limit={10}
              page={parseInt(commentPage, 10)}
              handleSetPage={this.handleSetPage}
            />
            }
          </div>

        </div>
      )
    }

    return (<div></div>)
  }
});

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