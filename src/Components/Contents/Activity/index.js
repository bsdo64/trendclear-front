/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {Link} from 'react-router';
import cx from 'classnames';
import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';
import PostActions from '../../../Actions/PostActions';

import Waypoint from 'react-waypoint';

require('./index.scss');
const ActivityBox = React.createClass({
  displayName: 'ActivityBox',
  propTypes: {},
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  createActivityUserHeader(UserStore) {
    "use strict";

    const user = UserStore.get('user');
    const sex = UserStore.getIn(['profile', 'sex']),
          avatar_img = UserStore.getIn(['profile', 'avatar_img']);

    return (
      <h2 className="ui center aligned icon header">
        {this.createAvatarImg(sex, avatar_img)}
        <div className="nick">{user.get('nick')}</div>
      </h2>
    )
  },
  createAvatarImg(sex, avatarImg) {
    
    if (avatarImg) {
      return <img className="circular users icon" src={'/image/uploaded/files/' + avatarImg} />;
    } else {
      if (sex) {
        return <img className="circular users icon" src="/images/default-male.png" />;
      } else {
        return <img className="circular users icon" src="/images/default-female.png" />;
      }
    }
  },
  createActivityMeta(meta) {
    "use strict";

    return (
      <div className="activity-meta">
        <div className="ui horizontal list">
          <div className="item">
            <div className="middle aligned content">
              좋아요 {meta && meta.get('likesCount')}
            </div>
          </div>
          <div className="item">
            <div className="middle aligned content">
              글 {meta && meta.get('postsCount')}
            </div>
          </div>
          <div className="item">
            <div className="middle aligned content">
              댓글 {meta && meta.get('commentsCount')}
            </div>
          </div>
        </div>
      </div>
    )
  },

  getMorePosts(context) {
    "use strict";

    const {PaginationStore} = this.props;
    const Pagination = PaginationStore.get(context);
    if (Pagination) {
      const nextPage = Pagination.get('next_page');

      if (nextPage) {
        PostActions.getMoreMyPost({
          type: context,
          page: nextPage
        });
      }
    }
  },

  createStyle(context, linkContext) {
    "use strict";

    return cx('item', {
      active: context === linkContext
    })
  },

  render() {
    const {UserStore, ActivityStore, location} = this.props;
    const {ListStore, Posts, Users, AuthStore, PaginationStore, LoginModalStore} = this.props;
    let context, Collection, PostIdList;

    if (location.pathname === '/activity' || location.pathname === '/activity/likes') {
      context = 'likePostList';
      Collection = PaginationStore.get(context);
      PostIdList = ListStore.get(context);

    } else if (location.pathname === ('/activity/posts')) {
      context = 'myWritePostList';
      Collection = PaginationStore.get(context);
      PostIdList = ListStore.get(context);

    } else if (location.pathname === ('/activity/comments')) {
      context = 'myWriteCommentPostList';
      Collection = PaginationStore.get(context);
      PostIdList = ListStore.get(context);
    }

    return (
      <div id="activity">
        <div className="activity-header">
          <div className="activity-background">

            {this.createActivityUserHeader(UserStore)}
            {this.createActivityMeta(ActivityStore.get('meta'))}
          </div>

          <div className="ui menu activity-menu">
            <Link to="/activity/likes" className={this.createStyle(context, 'likePostList')}>
              좋아요
            </Link>
            <Link to="/activity/posts" className={this.createStyle(context, 'myWritePostList')}>
              글
            </Link>
            <Link to="/activity/comments" className={this.createStyle(context, 'myWriteCommentPostList')}>
              댓글
            </Link>
          </div>
        </div>

        <div id="best_contents">

          <InfiniteList
            PostIdList={PostIdList}
            PostItems={Posts}
            AuthorItems={Users}
            User={AuthStore}
            LoginModalFlag={LoginModalStore.get('openLoginModal')}
          />

          <Waypoint
            onEnter={this.getMorePosts.bind(this, context)}
            bottomOffset='-10%'
            scrollableAncestor={window || null}
          />

          <InfiniteLoader collection={Collection} />

        </div>

      </div>
    );
  }
});

export default ActivityBox;
