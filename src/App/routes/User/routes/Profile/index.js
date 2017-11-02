import React from 'react';
import PropTypes from 'prop-types';
import { UI } from '../../../../Reducers/InitialStates/index';
import { connect } from 'react-redux';
import { getUser } from '../../../../Selectors/User';

import AvatarImage from '../../../../components/AvatarImage/index.js';

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

export function ActivityHeader(props) {
  const { UserStore, ActivityStore } = props;

  return (
    <div className="activity-header">
      <div className="activity-background">

        {UserStore && createActivityUserHeader(UserStore)}
        {ActivityStore && createActivityMeta(ActivityStore.get('meta'))}
      </div>
    </div>
  )
}

ActivityHeader.propTypes = {
  UserStore: PropTypes.object,
  ActivityStore: PropTypes.object.isRequired,
};


const Profile = (props) => {
  const { user, ActivityStore } = props;
  return (
    <div id="activity">
      <ActivityHeader
          UserStore={user}
          ActivityStore={ActivityStore}
        />
    </div>
  )
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  ActivityStore: PropTypes.object.isRequired
};

Profile.defaultProps = {
  user: UI.User,
  ActivityStore: UI.Activity
};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    user: getUser(StoreState),
    ActivityStore: getUIState('Activity'),
  };
};

export default connect(
  mapStateToProps,
  {}
)(Profile);