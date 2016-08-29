import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {browserHistory} from 'react-router';

import LoginActions from '../../../Actions/LoginActions';
import CommentActions from '../../../Actions/CommentActions';

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
  "use strict";

  const removedLine = text.replace(/\n\s*\n/g, '\n');
  const removedWhite = removedLine.replace(/\s{2,}/g, ' ');
  const removedNbsp = removedWhite.replace(/ ?&nbsp; ?|\t+/g, '');
  return removedNbsp;
}

function checkSkillAvailable(skill) {
  "use strict";

  const property = skill.getIn(['skill', 'property']);
  const cooltime = property.get('cooltime');
  const usingAt = skill.get('using_at');

  if (usingAt === null) {
    return true;
  }

  if (cooltime && usingAt) {
    const gapSec = (new Date() - new Date(usingAt)) / 1000;
    if (gapSec > cooltime) {
      return true;
    }
  }

  return false;
}


function sendSubCommentLike(props) {
  const {location, modalFlag, isLogin, subCommentId} = props;
  return function createSendSubCommentLike() {
    if (!isLogin) {
      LoginActions.toggleLoginModal(modalFlag, location.pathname + location.search);
    } else {
      CommentActions.likeSubComment(subCommentId);
    }
  }
}

function subCommentItem(props) {
  const {subComments, authors, commentAuthor, userId} = props;

  return function createSubCommentItem(subCommentId) {
    const subComment = subComments.get(subCommentId.toString());

    if (subComment) {
      const subCommentAuthor = authors.get(subComment.get('author').toString());
      props.subCommentId = subCommentId;

      if (subCommentAuthor) {
        const subCommentSex = subCommentAuthor.getIn(['profile', 'sex']),
          sub_avatar_img = subCommentAuthor.getIn(['profile', 'avatar_img']),
          sub_icon_img = subCommentAuthor.getIn(['icon', 0, 'iconDef', 'icon_img']);
        let subIconImg;

        if (sub_icon_img) {
          subIconImg = <img className="user_icon_img" src={'/images/' + sub_icon_img}/>;
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
                <div className="comment_text"
                     dangerouslySetInnerHTML={{ __html: subComment.get('content')}}
                ></div>
              </div>
              <div className="actions">
                <div className="like_box">
                  <div className={'like_icon ' + (subComment.get('liked') ? 'active' : '')} onClick={sendSubCommentLike(props)}>
                    <i className={'heart ' + (subComment.get('liked')? '' : 'outline') + ' icon'} />
                  </div>
                  <a className="like_count">{subComment.get('like_count')}</a>
                </div>
                <div className="report_box">
                  <Menu
                    isUser={userId === subCommentAuthor.get('id')}
                    targetType="subComment"
                    targetId={subComment.get('id')}
                  />
                </div>
              </div>

            </div>
          </div>
        )
      }
    }

    return (<div key={userId}></div>)
  }
}

const CommentItem = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      subCommentOpen: false,
      liked: false,
      focus: false
    };
  },

  show() {
    "use strict";

    this.setState({focus: true})
  },

  close() {
    "use strict";

    this.setState({focus: false})
  },

  sendLike() {
    "use strict";

    const {LoginStore} = this.props;
    const modalFlag = LoginStore.get('openLoginModal');
    const isLogin = LoginStore.get('isLogin');
    if (!isLogin) {
      LoginActions.toggleLoginModal(modalFlag, '/');
    } else {
      CommentActions.likeComment(this.props.comment.get('id'));
    }
  },

  toggleSubComment() {
    "use strict";
    const self = this;

    this.setState({subCommentOpen: !this.state.subCommentOpen}, () => {

      const commentId = this.props.comment.get('id');
      const subCommentOpen = this.state.subCommentOpen;
      this.editor = new MediumEditor(this.refs['sub_comment_content_' + commentId], commentMediumConfig);
    });
  },

  submitSubComment(commentId) {
    "use strict";

    const {LoginStore, UserStore} = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {
      const skills = UserStore.get('skills');
      const writePost = skills
        .filter((skill, index) => skill.getIn(['skill', 'name']) === 'write_sub_comment')
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
      const modalFlag = LoginStore.get('openLoginModal');
      const location = this.props.location;
      LoginActions.toggleLoginModal(modalFlag, location.pathname + location.search);
    }
  },

  render() {
    "use strict";

    const {LoginStore, UserStore} = this.props;
    const isLogin = LoginStore.get('isLogin');

    let userId;
    if (isLogin) {
      userId = UserStore.getIn(['user', 'id'])
    }

    const {comment, commentAuthor, subCommentList} = this.props;
    const subCommentOpen = this.state.subCommentOpen;

    const sex = commentAuthor.getIn(['profile', 'sex']),
      avatar_img = commentAuthor.getIn(['profile', 'avatar_img']),
      icon_img = commentAuthor.getIn(['icon', 0, 'iconDef', 'icon_img']);
    let iconImg;

    if (icon_img) {
      iconImg = <img className="user_icon_img" src={'/images/' + icon_img}/>;
    }

    const subCommentProps = {
      modalFlag: LoginStore.get('openLoginModal'),
      authors: this.props.authors,
      subComments: this.props.subComments,
      location: this.props.location,
      isLogin: isLogin,
      userId: userId,
      commentAuthor: commentAuthor
    };

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
            <div
              className="comment_text"
              dangerouslySetInnerHTML={{ __html: comment.get('content')}}
            ></div>
          </div>
          <div className="actions">
            <div className="like_box" onClick={this.sendLike}>
              <div className={'like_icon ' + (comment.get('liked') ? 'active' : '')}>
                <i className={'heart ' + (comment.get('liked')? '' : 'outline') + ' icon'} />
              </div>
              <a className="like_count">{comment.get('like_count')}</a>
            </div>
            <div className="comment_box" onClick={this.toggleSubComment}>
              <div className="comment_icon">
                <i className="edit outline icon"></i>
              </div>
              <a className="comment_count">{comment.get('sub_comment_count')}</a>
            </div>
            <div className="report_box">
              <Menu
                isUser={userId === commentAuthor.get('id')}
                targetType="comment"
                targetId={comment.get('id')}
              />
            </div>
          </div>
          {
            subCommentOpen && (subCommentList.size > 0) &&
            <div className="comments">
              {subCommentList.map(subCommentItem(subCommentProps))}
            </div>
          }

          {
            subCommentOpen &&
            <form className="ui reply form sub_comment_form">
              <div className="field">
                <div
                  id={"sub_comment_input_" + comment.get('id')}
                  ref={"sub_comment_content_" + comment.get('id')}
                  className="comment_input sub_comment_input"
                ></div>
              </div>
              <div className="ui primary submit icon button" onClick={this.submitSubComment.bind(this, comment.get('id'))}>
                <i className="icon edit"></i>
              </div>
            </form>
          }
        </div>
      </div>
    )

  }
});

const CommentList = React.createClass({
  render() {
    "use strict";
    const {commentList, comments, authors, subComments, UserStore, LoginStore, location} = this.props;

    let commentsNode = commentList.map(function(commentId) {
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
    "use strict";

    const {LoginStore, UserStore} = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {

      const skills = UserStore.get('skills');
      const writePost = skills
        .filter((skill, index) => skill.getIn(['skill', 'name']) === 'write_comment')
        .get(0);

      const result = checkSkillAvailable(writePost);

      if (result) {
        const allContents = this.editor.serialize();
        const el = allContents['comment_input'].value;

        if ($(el).text().trim()) {
          const comment = {
            content: removeWhiteSpace(el),
            postId: this.props.location.query.postId
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
      const modalFlag = LoginStore.get('openLoginModal');
      const location = this.props.location;
      LoginActions.toggleLoginModal(modalFlag, location.pathname + location.search);
    }
  },

  render() {
    "use strict";

    const {comments, subComments, authors, IPost} = this.props;
    const commentList = IPost.get('comments');

    if (commentList) {

      const commentPage = this.props.location.query.comment_p ? this.props.location.query.comment_p : 1;
      const commentLength = IPost.get('comment_count');

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
              ></div>
            </div>
            <div
              className="ui primary submit icon button"
              onClick={this.submitComment}
            >
              <i className="icon edit"></i>
            </div>
          </form>

          <CommentList
            LoginStore={this.props.LoginStore}
            UserStore={this.props.UserStore}
            location={this.props.location}
            commentList={commentList}
            authors={authors}
            comments={comments}
            subComments={subComments}
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
  componentDidMount() {
    $('.ui.embed').embed();
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },

  render() {
    "use strict";

    const {Users, Posts, ListStore, AuthStore, LoginModalStore, LoginStore, UserStore} = this.props;

    const postId = ListStore.get('IPost');
    if (postId) {
      const post = Posts.get(postId.toString());

      if (post) {
        const author = Users.get(post.get('author').toString());
        const user = AuthStore.get('userId') ? Users.get(AuthStore.get('userId').toString()) : null;
        const LoginModalFlag = LoginModalStore.get('openLoginModal');

        return (
          <div id="post_box" className="ui items">

            {
              post &&
              <BestPost
                author={author}
                post={post}
                user={user}
                loginModalFlag={LoginModalFlag}
                postStyle="post_item"
              />
            }

            {
              post &&
              <CommentBox
                {...this.props}
                IPost={post}
                comments={this.props.Comments}
                subComments={this.props.SubComments}
                authors={this.props.Users}
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