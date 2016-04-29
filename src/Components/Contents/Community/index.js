/**
 * Created by dobyeongsu on 2016. 3. 25..
 */
/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {Link} from 'react-router';
import Paginator from '../../Paginator';
import CommunityActions from '../../../Actions/CommunityActions';
import Post from './Post';

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
      const { list, club } = this.props.CommunityStore.toJS();
      const { user, login } = { user: 'abc', login: true};
      const { title, description, url, ClubGroup } = club;
      const { page, limit, total, data } = list;
      const { postId } = { postId: 1 };

      const defaultPageUrl = '/community?' + this.props.location.search;
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
            <div className="item">
              <div className="middle aligned content">샴푸 (150)</div>
            </div>
            <div className="item">
              <div className="middle aligned content">샴푸 (150)</div>
            </div>
            <div className="item">
              <div className="middle aligned content">샴푸 (150)</div>
            </div>
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

          {
            user && login &&
            <div className="ui right aligned container">
              <Link className="ui button primary tiny" to={'submit'}>글쓰기</Link>
            </div>
          }

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
    } else if (type === 'post') {
      const post = this.props.CommunityStore.get('post');

      return (
        <div id="post_box" className="ui items">
          <Post post={post} styleClass="post_item" />
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