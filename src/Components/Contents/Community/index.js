/**
 * Created by dobyeongsu on 2016. 3. 25..
 */
/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {Map} from 'immutable';
import {Link, browserHistory} from 'react-router';
import Paginator from '../../Paginator';
import LoginActions from '../../../Actions/LoginActions';
import CommentActions from '../../../Actions/CommentActions';
import CommunityActions from '../../../Actions/CommunityActions';
import Post from './Post';

const CommentItem = React.createClass({
  getInitialState() {
    return {
      subCommentOpen: false,
      liked: false
    };
  },

  componentDidMount() {

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

    this.setState({subCommentOpen: !this.state.subCommentOpen}, () => {

      const commentId = this.props.comment.get('id');
      const subCommentOpen = this.state.subCommentOpen;
      function test() {
        this.editor = new MediumEditor(this.refs['sub_comment_content_' + commentId], {
          toolbar: false,
          disableDoubleReturn: true
        })
      }
      if (subCommentOpen) {
        setTimeout(test.bind(this), 0);
      }
    });
  },

  submitSubComment(commentId) {
    "use strict";

    const {LoginStore} = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {
      const allContents = this.editor.serialize();
      const el = allContents['sub_comment_input_' + commentId].value;
      const comment = {
        content: el,
        commentId: commentId
      };

      CommentActions.submitSubComment(comment);
      this.editor.setContent('');
    } else {
      const modalFlag = LoginStore.get('openLoginModal');
      const location = this.props.location;
      LoginActions.toggleLoginModal(modalFlag, location.pathname + location.search);
    }
  },

  render() {
    "use strict";

    const {comment, author, authors, subComments} = this.props;
    const subCommentOpen = this.state.subCommentOpen;
    const sortSubComments = comment.get('subComments') ? comment.get('subComments').sortBy((value, key) => {
      return -key;
    }).toArray() : [];

    const sex = author.getIn(['profile', 'sex']),
      avatar_img = author.getIn(['profile', 'avatar_img']),
      icon_img = author.getIn(['icon', 0, 'iconDef', 'icon_img']);
    let avatarImg, iconImg;

    if (avatar_img) {
      avatarImg = <img src={'/image/uploaded/files/' + avatar_img} />;
    } else {
      if (sex) {
        avatarImg = <img src="/images/default-male.png" />;
      } else {
        avatarImg = <img src="/images/default-female.png" />;
      }
    }

    if (icon_img) {
      iconImg = <img className="user_icon_img" src={'/images/' + icon_img}/>;
    }

    function subCommentItem(subCommentId) {
      const subComment = subComments.get(subCommentId.toString());
      const subCommentAuthor = authors.get(subComment.get('author').toString());

      const subCommentSex = subCommentAuthor.getIn(['profile', 'sex']),
        sub_avatar_img = subCommentAuthor.getIn(['profile', 'avatar_img']),
        sub_icon_img = subCommentAuthor.getIn(['icon', 0, 'iconDef', 'icon_img']);
      let subAvatarImg, subIconImg;

      if (sub_avatar_img) {
        subAvatarImg = <img src={'/image/uploaded/files/' + sub_avatar_img} />;
      } else {
        if (subCommentSex) {
          subAvatarImg = <img src="/images/default-male.png" />;
        } else {
          subAvatarImg = <img src="/images/default-female.png" />;
        }
      }

      if (sub_icon_img) {
        subIconImg = <img className="user_icon_img" src={'/images/' + sub_icon_img}/>;
      }

      return (
        <div className="comment" key={subComment.get('id')}>
          <a className="avatar">
            {subAvatarImg}
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
                <div className="like_icon">
                  <i className="heart outline icon"></i>
                </div>
                <a className="like_count">{subComment.get('like_count')}</a>
              </div>
              <div className="report_box">
                <div className="report_icon">
                  <i className="warning outline icon"></i>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    }

    return (
      <div className="comment" key={comment.get('id')}>
        <a className="avatar">
          {avatarImg}
        </a>
        <div className="content">
          <a className="author">{author.get('nick')}</a>
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
              <div className="report_icon">
                <i className="warning outline icon"></i>
              </div>
            </div>
          </div>
          {
            subCommentOpen && (sortSubComments.length > 0) &&
            <div className="comments">
              {sortSubComments.map(subCommentItem)}
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
    const {comments, author, subComments, LoginStore, location} = this.props;

    let commentsNode = comments.map(function(comment) {
      const commentAuthor = author.get(comment.get('author').toString());
      return (
        <CommentItem
          LoginStore={LoginStore}
          key={comment.get('id')}
          comment={comment}
          author={commentAuthor}
          authors={author}
          subComments={subComments}
          location={location}
        />
      )
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

  componentDidMount() {
    this.editor = new MediumEditor(this.refs.comment_content, {
      toolbar: false,
      disableDoubleReturn: true
    });
  },

  handleSetPage(pagination) {
    let location = this.props.location;
    let url = `${location.pathname}?categoryId=${location.query.categoryId}&forumId=${location.query.forumId}&postId=${location.query.postId}&p=${location.query.p}&comment_p=${pagination.page}`;
    browserHistory.push(url);
  },

  submitComment() {
    "use strict";

    const {LoginStore} = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {
      const allContents = this.editor.serialize();
      const el = allContents['comment_input'].value;
      const comment = {
        content: el,
        postId: this.props.location.query.postId
      };

      CommentActions.submitComment(comment);
      this.editor.setContent('');
    } else {
      const modalFlag = LoginStore.get('openLoginModal');
      const location = this.props.location;
      LoginActions.toggleLoginModal(modalFlag, location.pathname + location.search);
    }
  },

  render() {
    "use strict";

    const commentPage = this.props.location.query.comment_p ? this.props.location.query.comment_p : 1;

    const IPost = this.props.IPost;
    const postId = IPost.get('result');
    const post = IPost.getIn(['entities', 'posts', postId.toString()]);
    const commentLength = post.get('comment_count');

    const comments = IPost.getIn(['entities', 'comments']);
    const author = IPost.getIn(['entities', 'author']);
    const subComments = IPost.getIn(['entities', 'subComments']);

    const sortComments = comments ? comments.sortBy((value, key) => {
      return -key;
    }).toArray() : [];
    const results = comments ? sortComments : [];

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
          location={this.props.location}
          author={author}
          comments={results}
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
});


require('./CommunityContents.scss');
const PostList = React.createClass({
  displayName: 'PostList',

  componentDidMount() {
    $('.ui.embed').embed();
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },


  render: function () {
    const item = this.props.item;
    const id = item.get('id');
    const title = item.get('title');
    const prefix= item.get('prefix');
    const created_at = item.get('created_at');
    const view_count = item.get('view_count');
    const like_count = item.get('like_count');
    const comment_count = item.get('comment_count');
    const forum = item.get('forum');

    const author = this.props.author;

    const { defaultPageUrl, page } = this.props;

    let activeClass;
    if (id == this.props.postIdNow) {
      activeClass = 'active';
    }

    return (
      <tr className={activeClass}>
        <td className="center aligned collapsing">{prefix && prefix.get('name')}</td>
        <td className="center aligned collapsing">{like_count}</td>
        <td className="center aligned collapsing">{view_count}</td>
        <td className="left aligned">
          <Link
            className="article_title"
            to={'/community?' +
                'categoryId=' + forum.getIn(['category', 'id']) +
                '&forumId=' + forum.get('id') +
                '&postId=' + id +
                '&p=' + page} >
            {title}
          </Link>
          <span>{ comment_count > 0 && '[' + comment_count + ']'}</span>
        </td>
        <td className="right aligned collapsing">{author.get('nick')}</td>
        <td className="center aligned collapsing">{created_at}</td>
      </tr>
    );
  }
});

const Forum = React.createClass({
  displayName: 'Forum',
  handleSetPage(pagination) {

    let location = this.props.location;
    let url = `${location.pathname}?` +
                `categoryId=${location.query.categoryId}&` +
                `forumId=${location.query.forumId}&` +
                (location.query.postId ? `postId=${location.query.postId}&` : '') +
                `p=${pagination.page}`;
    browserHistory.push(url);

  },
  openLoginModal() {
    "use strict";

    const modalFlag = this.props.LoginStore.get('openLoginModal');
    const location = this.props.location;
    LoginActions.toggleLoginModal(modalFlag, location.pathname + location.search);
  },
  render() {
    "use strict";
    const user = this.props.UserStore.get('user');
    const isLogin = this.props.LoginStore.get('isLogin');

    const forum = this.props.CommunityStore.get('forum');
    const title = forum.get('title');
    const description = forum.get('description');
    const url = forum.get('url');

    const list = this.props.CommunityStore.get('list');
    const page = list.get('page');
    const limit = list.get('limit');
    const total = list.get('total');

    const data = list.getIn(['postList', 'result']);
    const entitiy = list.getIn(['postList', 'entities']);

    const { query } = this.props.location;
    const {categoryId, forumId, postId: postIdNow} = query;

    const defaultPageUrl = '/community' + this.props.location.search;

    function createPrefixItem(prefixId, index) {
      let prefixList = forum.getIn(['prefixList', 'entities', 'prefixes']);
      let prefix = prefixList.get(prefixId.toString());
      return (
        <div className="item" key={prefixId}>
          <div className="middle aligned content">{prefix.get('name') + " (" + prefix.get('count') + ")"}</div>
        </div>
      )
    }
    return (
      <div id="forum_contents">
        <h3 className="ui header">
          {title}
          <div className="sub header">{description}</div>
        </h3>
        <div className="ui horizontal celled list">
          <div className="item" style={{fontWeight: 'bold'}}>
            <div className="middle aligned content bold">전체</div>
          </div>
          {
            forum.get('prefixList') &&
            forum.getIn(['prefixList', 'result']).map(createPrefixItem)
          }
        </div>
        <table className="ui table very compact" >
          <thead>
          <tr>
            <th className="center aligned collapsing">말머리</th>
            <th className="center aligned collapsing">좋아요</th>
            <th className="center aligned collapsing">조회</th>
            <th className="center aligned">제목</th>
            <th className="center aligned collapsing">글쓴이</th>
            <th className="center aligned collapsing">등록일</th>
          </tr>
          </thead>
          <tbody>

          {
            data &&
            data.map(function (postId) {
              let item = entitiy.getIn(['posts', postId.toString()]);
              let author = entitiy.getIn(['author', item.get('author').toString()]);
              return (
                <PostList
                  key={postId}
                  author={author}
                  item={item} defaultPageUrl={defaultPageUrl}
                  postIdNow={parseInt(postIdNow, 10)} page={page} />
              );
            })
          }

          </tbody>
        </table>


        <div className="ui right aligned container">
          {
            user && isLogin &&
            <Link
              className="ui button primary tiny"
              to={{pathname: '/community/submit', query: {categoryId: categoryId, forumId: forumId}}}>
              글쓰기
            </Link>
          }
          {
            !user && !isLogin &&
            <a
              className="ui button primary tiny"
              onClick={this.openLoginModal}>
              글쓰기
            </a>
          }
        </div>

        <div className="ui divider"></div>

        <div className="ui center aligned container">

          { (total > 0) &&
            <Paginator
              total={total}
              limit={limit}
              page={page}
              handleSetPage={this.handleSetPage}
            />
          }

          <div className="ui search mini" style={{padding: '15px'}}>
            <div className="ui icon input">
              <input className="prompt" type="text" placeholder="Search animals..." />
              <i className="search icon"></i>
            </div>
            <div className="results"></div>
          </div>
        </div>


      </div>
    );
  }
});

const CommunityContents = React.createClass({
  displayName: 'CommunityContents',
  render() {
    "use strict";
    const type = this.props.CommunityStore.get('type');

    if (type === 'forum') {
      return (
        <Forum
          {...this.props}
        />
      )
    } else if (type === 'post') {
      const post = this.props.CommunityStore.getIn(['post', 'IPost']);

      return (
        <div id="post_box" className="ui items">

          {
            post &&
            <Post post={post} styleClass="post_item"/>
          }

          {
            post &&
            <CommentBox
              {...this.props}
              IPost={post}
            />
          }

          <Forum
            {...this.props}
          />
        </div>
      )

    } else {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui large text loader">로딩중..</div>
        </div>
      )
    }
  }
});

export default CommunityContents;