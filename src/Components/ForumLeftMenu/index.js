import React from 'react';
import { Link, browserHistory } from 'react-router';

require('./index.scss');
const ForumLeftMenu = React.createClass({
  displayName: 'ForumLeftMenu',
  render() {
    const { CommunityStore, AuthStore } = this.props;
    const forum = CommunityStore.get('forum');

    if (forum) {
      const creator = forum.get('creator');
      if (creator) {
        const userId = AuthStore.get('userId');

        return (
          <div id="forum_category">
            {/* Title */}
            <div id="sub_category">
              <div className="sub_category_button">
                <div className="sub_category_text">
                  <Link to={`/community?forumId=${forum.get('id')}`}>{forum.get('title')}</Link>
                </div>
              </div>
            </div>

            {/* Menu */}
            <menu className="sub_category_list" key={forum.get('id')}>

              <ul >
                <li >
                  <h5 className="">
                    <a><i className="fa fa-rss"/>{' 뉴스피드'}</a>
                  </h5>

                  <div className="sub_category item">
                    <Link to={{pathname: '/community'}}>{'최신 글'}</Link>
                  </div>
                  <div className="sub_category item">
                    <Link to={{pathname: '/community'}}>{'인기 글'}</Link>
                  </div>
                  <div className="sub_category item">
                    <Link to={{pathname: '/community'}}>{'많이 본 글'}</Link>
                  </div>
                  <div className="sub_category item">
                    <Link to={{pathname: '/community'}}>{'댓글 많은 글'}</Link>
                  </div>
                </li>

              </ul>
            </menu>
          </div>
        )
      }
    }

    return (
      <div id="forum_category">
        {/* Title */}
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{''}</div>
          </div>
        </div>

        {/* Menu */}
        <menu className="sub_category_list">

          <ul >
            <li >
              <h5 className="">
                <a><i className="fa fa-rss"/>{' 뉴스피드'}</a>
              </h5>

              <div className="sub_category item">
                <Link to={{pathname: '/community'}}>{'최신 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{pathname: '/community'}}>{'인기 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{pathname: '/community'}}>{'많이 본 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{pathname: '/community'}}>{'댓글 많은 글'}</Link>
              </div>
            </li>
          </ul>
        </menu>
      </div>
    );
  }
});

export default ForumLeftMenu;