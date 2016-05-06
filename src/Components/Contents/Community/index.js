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

require('./Comment.scss');
const Comment = React.createClass({
  displayName: 'Comment',
  render() {
    "use strict";

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
        <div className="comment">
          <a className="avatar">
            <img src="/images/default-male.png" />
          </a>
          <div className="content">
            <a className="author">Joe Henderson</a>
            <div className="metadata">
              <div className="date">1 day ago</div>
            </div>
            <div className="text">
              <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
              <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
            </div>
            <div className="actions">
              <div className="like_box">
                <div className="like_icon">
                  <i className="heart outline icon"></i>
                </div>
                <a className="like_count">{123}</a>
              </div>
              <div className="comment_box">
                <div className="comment_icon">
                  <i className="edit outline icon"></i>
                </div>
                <a className="comment_count">{1234}</a>
              </div>
              <a className="reply">Reply</a>
              <div className="report_box">
                <div className="report_icon">
                  <i className="warning outline icon"></i>
                </div>
              </div>
            </div>
            <div className="comments">
              <div className="comment">
                <a className="avatar">
                  <img src="/images/default-male.png" />
                </a>
                <div className="content">
                  <a className="author">Jenny Hess</a>
                  <div className="metadata">
                    <span className="date">Just now</span>
                  </div>
                  <div className="text">
                    Elliot you are always so right :)
                  </div>
                </div>
              </div>
            </div>
            <form className="ui reply form">
              <div className="field">
                <textarea></textarea>
              </div>
              <div className="ui primary submit icon button">
                <i className="icon edit"></i>
              </div>
            </form>
          </div>
        </div>
        <div className="comment">
          <a className="avatar">
            <img src="/images/default-female.png" />
          </a>
          <div className="content">
            <a className="author">Christian Rocha</a>
            <div className="metadata">
              <div className="date">2 days ago</div>
            </div>
            <div className="text">
              I re-tweeted this.
            </div>
            <div className="actions">
              <a className="reply">Reply</a>
            </div>
          </div>
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
    const { postId } = { postId: 1 };

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
            <th className="center aligned collapsing">댓글</th>
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
                          postId={postId} page={page} />
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
              to={{pathname: '/community/submit', query:this.props.location.query}}>
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
  render: function () {
    const { id, title, Prefix, User, created_at, view_count, like_count, comment_count } = this.props.item;
    const { defaultPageUrl, page } = this.props;

    let activeClass;
    if (id === this.props.postId) {
      activeClass = 'active';
    }

    return (
      <tr className={activeClass}>
        <td className="center aligned collapsing">{Prefix && Prefix.name}</td>
        <td className="center aligned collapsing">{like_count}</td>
        <td className="center aligned collapsing">{view_count}</td>
        <td className="right aligned collapsing">{comment_count}</td>
        <td className="left aligned"><Link to={defaultPageUrl + '&postId=' + page + '&p=' + page}>{title}</Link></td>
        <td className="right aligned collapsing">{User.nick}</td>
        <td className="center aligned collapsing">{created_at}</td>
      </tr>
    );
  }
});

let CommunityContents = React.createClass({
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

          <Comment />
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