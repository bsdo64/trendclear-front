/**
 * Created by dobyeongsu on 2016. 3. 25..
 */
/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import CommunityActions from '../../../Actions/CommunityActions';

import Forum from './Forum';
import PostPage from './PostPage';

const CommunityContents = React.createClass({
  displayName: 'CommunityContents',
  // mixins: [PureRenderMixin],

  componentWillUnmount() {
    CommunityActions.resetData();
  },

  checkBanned() {
    "use strict";

    const {Forums, AuthStore, ListStore} = this.props;

    const userId = AuthStore.get('userId');
    const isLogin = AuthStore.get('isLogin');

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
  },

  render() {
    "use strict";
    const type = this.props.CommunityStore.get('type');
    const isLogin = this.props.AuthStore.get('isLogin');
    const isBanned = this.checkBanned();
    if (isLogin && isBanned) {

      return (
        <div style={{textAlign: 'center', paddingTop: 60}}>
          <h2 className="ui icon header">
            <i className="remove icon"></i>
            <div className="content">
              당신은 벤 되었습니다
              <div className="sub header">다른 게시판을 찾거나 새로운 게시판을 만들어 보세요</div>
            </div>
          </h2>
        </div>
      )

    } else {
      if (type === 'forum') {
        return (
          <Forum
            {...this.props}
          />
        )
      } else if (type === 'post') {
        return (
          <PostPage
            {...this.props}
          />
        )

      } else {
        return (
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">로딩중..</div>
          </div>
        )
      }
    }
  }
});

export default CommunityContents;