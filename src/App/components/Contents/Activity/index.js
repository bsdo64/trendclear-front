/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import AvatarImage from '../../AvatarImage';
import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';
import Waypoint from 'react-waypoint';

require('./index.scss');
const ActivityBox = props => {
  function createActivityUserHeader(UserStore) {

    const user = UserStore.get('user');
    const sex = UserStore.getIn(['profile', 'sex']),
      avatar_img = UserStore.getIn(['profile', 'avatar_img']);

    return (
      <h2 className="ui center aligned icon header">
        <AvatarImage
          sex={sex}
          avatarImg={avatar_img}
          imageClass="circular users icon"
        />
        <div className="nick">{user.get('nick')}</div>
      </h2>
    );
  }

  function createActivityMeta(meta) {

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
    );
  }

  function getMorePosts(context) {

    const { PaginationStore, FireRequestGetMorePostList } = props;
    const Pagination = PaginationStore.get(context);
    if (Pagination) {
      const nextPage = Pagination.get('next_page');

      if (nextPage) {

        let pathName, listName;
        switch (context) {
          case 'likePostList':
            pathName = '/user/likes';
            listName = 'likePostList';
            break;

          case 'myWritePostList':
            pathName = '/user/posts';
            listName = 'myWritePostList';
            break;

          case 'myWriteCommentPostList':
            pathName = '/user/comments';
            listName = 'myWriteCommentPostList';
            break;

          default:
            pathName = '/user/likes';
            listName = 'likePostList';
        }

        FireRequestGetMorePostList({
          listName,
          pathName,
          params: {
            page: nextPage,
          },
        });
      }
    }
  }

  function createStyle(context, linkContext) {
    return cx('item', {
      active: context === linkContext,
    });
  }

  const { UserStore, ActivityStore, location } = props;
  const { ListStore, Posts, Users, AuthStore, PaginationStore } = props;

  let context, Collection, PostIdList;
  if (location.pathname === '/activity' ||
    location.pathname === '/activity/likes') {
    context = 'likePostList';
  } else if (location.pathname === ('/activity/posts')) {
    context = 'myWritePostList';
  } else if (location.pathname === ('/activity/comments')) {
    context = 'myWriteCommentPostList';
  }

  Collection = PaginationStore.get(context);
  PostIdList = ListStore.get(context);

  if (UserStore.get('user')) {
    return (
      <div id="activity">
        <div className="activity-header">
          <div className="activity-background">

            {createActivityUserHeader(UserStore)}
            {createActivityMeta(ActivityStore.get('meta'))}
          </div>

          <div className="ui menu activity-menu">
            <Link to="/activity/likes"
                  className={createStyle(context, 'likePostList')}>
              좋아요
            </Link>
            <Link to="/activity/posts"
                  className={createStyle(context, 'myWritePostList')}>
              글
            </Link>
            <Link to="/activity/comments" className={createStyle(context,
              'myWriteCommentPostList')}>
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
            scrollHeight={ListStore.get('scrollHeight')}
            {...props}
          />

          <Waypoint
            onEnter={getMorePosts.bind(this, context)}
            bottomOffset='-200px'
            scrollableAncestor={window || null}
          />

          <InfiniteLoader collection={Collection}/>

        </div>

      </div>
    );
  } else {
    return (
      <div className="ui active loader"/>
    );
  }
};

ActivityBox.displayName = 'ActivityBox';
ActivityBox.propTypes = {
  UserStore: PropTypes.object.isRequired,
    ActivityStore: PropTypes.object.isRequired,
    ListStore: PropTypes.object.isRequired,
    AuthStore: PropTypes.object.isRequired,
    PaginationStore: PropTypes.object.isRequired,
    Posts: PropTypes.object.isRequired,
    Users: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,

    FireSetScrollPosition: PropTypes.func.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,
    FireToggleDeleteModal: PropTypes.func.isRequired,
    FireRequestGetMorePostList: PropTypes.func.isRequired,
    FireRequestLikePost: PropTypes.func.isRequired,
    FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
    FireRequestActivateVenalink: PropTypes.func.isRequired,
    FireRequestParticipateVenalink: PropTypes.func.isRequired,
};

export default ActivityBox;
