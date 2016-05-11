/**
 * Created by dobyeongsu on 2016. 3. 25..
 */
/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {Link, browserHistory} from 'react-router';
import Paginator from '../../Paginator';
import LoginActions from '../../../Actions/LoginActions';
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
          <a className="author">{comment.getIn(['author', 'nick'])}</a>
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
    let commentsNode = this.props.comments.map(function(comment) {
      return (
        <CommentItem comment={comment} />
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
  render() {
    "use strict";

    const comments = this.props.comments;


    return (
      <div id="comment_box" className="ui comments">

        <div className="comment_header">
          <div className="comment_count">댓글 3개</div>
          <ul className="comment_sort_box">
            <li>최신순</li>
            <li>좋아요순</li>
            <li>댓글순</li>
          </ul>
        </div>
        <form className="ui reply form">
          <div className="field">
            <textarea></textarea>
          </div>
          <div className="ui primary submit icon button">
            <i className="icon edit"></i>
          </div>
        </form>

        <CommentList
          comments={comments}
        />
        
        <div className="ui center aligned container">
          <Paginator
            total={10}
            limit={10}
            page={1}
            handleSetPage={this.handleSetPage}
          />
        </div>

      </div>
    )
  }
});

const Forum = React.createClass({
  displayName: 'Forum',
  openLoginModal() {
    "use strict";

    const modalFlag = this.props.LoginStore.openLoginModal;
    const location = this.props.location;
    LoginActions.toggleLoginModal(modalFlag, location.pathname + location.search);
  },
  render() {
    "use strict";
    const { list, forum } = this.props.CommunityStore;
    const { user } = this.props.UserStore;
    const { isLogin } = this.props.LoginStore;
    const { title, description, url } = forum;
    const { page, limit, total, data } = list;
    const { query } = this.props.location;
    const {categoryId, forumId, postId} = query;

    const defaultPageUrl = '/community' + this.props.location.search;

    function createPrefixItem(value, index) {
      return (
        <div className="item">
          <div className="middle aligned content">{value.name + " (" + value.posts.length + ")"}</div>
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
            forum.prefixes.map(createPrefixItem)
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
            data.map(function (item) {
              return (
                <PostList item={item} defaultPageUrl={defaultPageUrl}
                          postId={parseInt(postId, 10)} page={page} />
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
    const { id, title, prefix, author, created_at, view_count, like_count, comment_count, forum } = this.props.item;
    const { defaultPageUrl, page } = this.props;

    let activeClass;
    if (id == this.props.postId) {
      activeClass = 'active';
    }

    return (
      <tr className={activeClass}>
        <td className="center aligned collapsing">{prefix && prefix.name}</td>
        <td className="center aligned collapsing">{like_count}</td>
        <td className="center aligned collapsing">{view_count}</td>
        <td className="left aligned">
          <Link to={'/community?' +
                      'categoryId=' + forum.category.id +
                      '&forumId=' + forum.id +
                      '&postId=' + id +
                      '&p=' + page} >
            {title}
          </Link>
          { comment_count > 0 && '[' + comment_count + ']'}
        </td>
        <td className="right aligned collapsing">{author.nick}</td>
        <td className="center aligned collapsing">{created_at}</td>
      </tr>
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
          CommunityStore={this.props.CommunityStore.toJS()}
          UserStore={this.props.UserStore.toJS()}
          LoginStore={this.props.LoginStore.toJS()}
        />
      )
    } else if (type === 'post') {
      const post = this.props.CommunityStore.get('post');

      return (
        <div id="post_box" className="ui items">
          <Post post={post} styleClass="post_item" />

          <CommentBox
            comments={post.get('comments')}
          />
          <Forum
            {...this.props}
            CommunityStore={this.props.CommunityStore.toJS()}
            UserStore={this.props.UserStore.toJS()}
            LoginStore={this.props.LoginStore.toJS()}
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