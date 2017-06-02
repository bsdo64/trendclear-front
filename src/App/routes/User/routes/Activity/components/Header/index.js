import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import AvatarImage from '../../../../components/AvatarImage/index.js';

function createStyle(context, linkContext) {
  return cx('item', {
    active: context === linkContext,
  });
}

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

export default function ActivityHeader(props) {
  const { UserStore, ActivityStore, context } = props;

  return (
    <div className="activity-header">
      <div className="activity-background">

        {createActivityUserHeader(UserStore)}
        {createActivityMeta(ActivityStore.get('meta'))}
      </div>

      <div className="ui menu activity-menu">
        <Link to="/user/activity/likes"
              className={createStyle(context, 'likePostList')}>
          좋아요
        </Link>
        <Link to="/user/activity/posts"
              className={createStyle(context, 'myWritePostList')}>
          글
        </Link>
        <Link to="/user/activity/comments" className={createStyle(context,
          'myWriteCommentPostList')}>
          댓글
        </Link>
      </div>
    </div>
  )
}

ActivityHeader.propTypes = {
  UserStore: PropTypes.object,
  ActivityStore: PropTypes.object.isRequired,
  context: PropTypes.string.isRequired,
};
