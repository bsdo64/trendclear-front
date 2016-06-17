/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {Link} from 'react-router';
import BestContainer from '../../../Container/Contents/Best';

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
              글 {meta.get('postsCount')}
            </div>
          </div>
          <div className="item">
            <div className="middle aligned content">
              좋아요 {meta.get('likesCount')}
            </div>
          </div>
          <div className="item">
            <div className="middle aligned content">
              댓글 {meta.get('commentsCount')}
            </div>
          </div>
        </div>
      </div>
    )
  },
  render() {
    const {UserStore, ActivityStore} = this.props;

    return (
      <div id="activity">
        <div className="activity-header">
          <div className="activity-background">

            {this.createActivityUserHeader(UserStore)}
            {this.createActivityMeta(ActivityStore.get('meta'))}
          </div>

          <div className="ui menu activity-menu">
            <Link to="/activity/likes" className="item">
              좋아요
            </Link>
            <Link to="/activity/posts" className="item">
              글
            </Link>
            <Link to="/activity/comments" className="item active">
              댓글
            </Link>
          </div>
        </div>

        <BestContainer />
      </div>
    );
  }
});

export default ActivityBox;
