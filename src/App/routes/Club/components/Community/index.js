import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Forum from './Forum';
import PostPage from './PostPage';
import Feeds from '../FeedPostList/index.js'

function getContentTypeByUrl(location) {
  const queryObj = qs.parse(location.search.substr(1));
  const url = location.pathname.split('/');

  if (url.indexOf('feed') !== -1) {
    return 'feed';
  }

  if (queryObj.postId) {
    return 'post';
  } else {
    return 'forum';
  }
}

const CommunityContents = props => {
  const { Forums, AuthStore, ListStore, location } = props;

  function checkBanned() {

    const userId = AuthStore.get('userId');
    const forumId = ListStore.get('forum');

    if (forumId) {
      const forum = Forums.get(forumId.toString());

      if (!forum) {
        return false;
      }

      const bans = forum.get('bans');

      if (!bans) {
        return false;
      }

      return bans.includes(userId);
    } else {
      return false;
    }
  }

  const type = getContentTypeByUrl(location);
  const isLogin = AuthStore.get('isLogin');
  const isBanned = checkBanned();
  if (isLogin && isBanned) {

    return (
      <div style={{ textAlign: 'center', paddingTop: 60 }}>
        <h2 className="ui icon header">
          <i className="remove icon"/>
          <div className="content">
            당신은 벤 되었습니다
            <div className="sub header">
              다른 게시판을 찾거나 새로운 게시판을 직접 만들어 보세요
            </div>
          </div>
        </h2>
      </div>
    );

  } else {
    if (type === 'forum') {
      return (
        <Forum
          {...props}
        />
      );
    } else if (type === 'post') {
      return (
        <PostPage
          {...props}
        />
      );
    } else if (type === 'feed') {
      return (
        <Feeds {...props} />
      )
    } else {
      return (
        <div className="ui active inverted dimmer"
             style={{background: 'rgb(230, 230, 230)'}}>
          <div className="ui large text loader">로딩중..</div>
        </div>
      );
    }
  }
};

CommunityContents.displayName = 'CommunityContents';
CommunityContents.propTypes = {
  location: PropTypes.object.isRequired,
  Forums: PropTypes.object.isRequired,
  AuthStore: PropTypes.object.isRequired,
  ListStore: PropTypes.object.isRequired,
  FireSetScrollPosition: PropTypes.func.isRequired,
  FireToggleLoginModal: PropTypes.func.isRequired,
  FireToggleReportModal: PropTypes.func.isRequired,
  FireRequestAddForumInCollection: PropTypes.func.isRequired,
  FireRequestRemoveForumInCollection: PropTypes.func.isRequired,
  FireToggleDeleteModal: PropTypes.func.isRequired,
  FireRequestFollowForum: PropTypes.func.isRequired,
  FireRequestUnFollowForum: PropTypes.func.isRequired,
  FireRequestLikePost: PropTypes.func.isRequired,
  FireRequestLikeComment: PropTypes.func.isRequired,
  FireRequestLikeSubComment: PropTypes.func.isRequired,
  FireRequestSubmitComment: PropTypes.func.isRequired,
  FireRequestSubmitSubComment: PropTypes.func.isRequired,
  FireRequestUpdateComment: PropTypes.func.isRequired,
  FireRequestUpdateSubComment: PropTypes.func.isRequired,
  FireOpenCommentUpdateView: PropTypes.func.isRequired,
  FireCloseCommentUpdateView: PropTypes.func.isRequired,
  FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
  FireRequestActivateVenalink: PropTypes.func.isRequired,
  FireRequestParticipateVenalink: PropTypes.func.isRequired,
};

export default CommunityContents;
