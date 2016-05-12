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
import Post from './Post';

const CommentItem = React.createClass({
  getInitialState() {
    return {
      subCommentOpen: false
    };
  },

  toggleSubComment() {
    "use strict";

    this.setState({subCommentOpen: !this.state.subCommentOpen})
  },

  render() {
    "use strict";

    const comment = this.props.comment;
    const author = this.props.author;
    const subCommentOpen = this.state.subCommentOpen;

    function subCommentItem(subComment) {
      return (
        <div className="comment" key={subComment.get('id')}>
          <a className="avatar">
            <img src="/images/default-male.png" />
          </a>
          <div className="content">
            <a className="author">{subComment.getIn(['author', 'nick'])}</a>
            <div className="metadata">
              <span className="date">{subComment.get('created_at')}</span>
            </div>
            <div className="text">
              <p>{subComment.get('content')}</p>
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
          <img src="/images/default-male.png" />
        </a>
        <div className="content">
          <a className="author">{author.get('nick')}</a>
          <div className="metadata">
            <div className="date">{comment.get('created_at')}</div>
          </div>
          <div className="text">
            <p>{comment.get('content')}</p>
          </div>
          <div className="actions">
            <div className="like_box">
              <div className="like_icon">
                <i className="heart outline icon"></i>
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
            subCommentOpen && comment.get('subComments') &&
            <div className="comments">
              {comment.get('subComments').map(subCommentItem)}
            </div>
          }

          {
            subCommentOpen &&
            <form className="ui reply form">
              <div className="field">
                <textarea></textarea>
              </div>
              <div className="ui primary submit icon button">
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
    const {results, comments, author} = this.props;

    let commentsNode = results.map(function(commentId) {
      const comment = comments.get(commentId.toString());
      const commentAuthor = author.get(comment.get('author').toString());
      return (
        <CommentItem
          comment={comment}
          author={commentAuthor}
        />
      )
    });
    return (
      <div>
        {commentsNode}
      </div>
    )
  }
});

require('./Comment.scss');
const CommentBox = React.createClass({
  displayName: 'CommentBox',
  submitComment() {
    "use strict";

    const comment = {
      content: this.refs.comment_content.value.trim(),
      postId: this.props.location.query.postId
    };

    CommentActions.submitComment(comment);
  },
  render() {
    "use strict";

    const IPost = this.props.IPost;
    const comments = IPost.getIn(['entities', 'comments']);
    const author = IPost.getIn(['entities', 'author']);
    const results = comments ? Object.keys(comments.toJS()) : [];

    return (
      <div id="comment_box" className="ui comments">

        <div className="comment_header">
          <div className="comment_count">댓글 {results.length}개</div>
          <ul className="comment_sort_box">
            <li>최신순</li>
            <li>좋아요순</li>
            <li>댓글순</li>
          </ul>
        </div>
        <form className="ui reply form">
          <div className="field">
            <textarea
              ref="comment_content"
              onChange={e => { let s = e.target.value.trim(); s=s.replace(/\r?\n/g, '<br />'); console.log(s)}}
            />
          </div>
          <div
            className="ui primary submit icon button"
            onClick={this.submitComment}
          >
            <i className="icon edit"></i>
          </div>
        </form>

        <CommentList
          comments={comments}
          author={author}
          results={results}
        />
        
        <div className="ui center aligned container">
          <Paginator
            total={results.length}
            limit={10}
            page={1}
            handleSetPage={this.handleSetPage}
          />
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
    $('.ui.embed').embed();
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
          <Link to={'/community?' +
                      'categoryId=' + forum.getIn(['category', 'id']) +
                      '&forumId=' + forum.get('id') +
                      '&postId=' + id +
                      '&p=' + page} >
            {title}
          </Link>
          { comment_count > 0 && '[' + comment_count + ']'}
        </td>
        <td className="right aligned collapsing">{author.get('nick')}</td>
        <td className="center aligned collapsing">{created_at}</td>
      </tr>
    );
  }
});

const Forum = React.createClass({
  displayName: 'Forum',
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
        <div className="item">
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

          <Paginator
            total={total}
            limit={limit}
            page={page}
            handleSetPage={this.handleSetPage}
          />

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

  handleSetPage(pagination) {
    ClubSectionActions.requestPosts(this.props.CommunityStore.club.id, pagination);
  },
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
        <div>
          Hello world!
        </div>
      )
    }
  }
});

export default CommunityContents;