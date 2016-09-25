import React from 'react';

import ForumInfo from './ForumInfo';
import ForumUrl from './ForumUrl';
import ForumPrefix from './ForumPrefix';
import Announce from './Announce';
import WritePost from './WritePost';
import WriteComment from './WriteComment';
import Share from './Share';
import Promotion from './Promotion';
import Managers from './Managers';
import BanList from './BanList';
import Spams from './Spams';
import SpamReports from './SpamReports';
import StatForum from './StatForum';
import StatVisitors from './StatVisitors';
import StatLikeRank from './StatLikeRank';
import StatCommentRank from './StatCommentRank';
import StatViewRank from './StatViewRank';

const checkManager = function checkManager(forum, userId) {
  "use strict";

  const managers = forum.get('managers');
  if (managers) {
    return managers.find(id => id === userId);
  } else {
    return false
  }
};

const ForumSettingsComponent = (props) => {
  const {ForumSettingStore, Forums, AuthStore, location} = props;
  const content = ForumSettingStore.get('content');
  const forumId = location.query.forumId;
  const isManager = checkManager(Forums.get(forumId.toString()), AuthStore.get('userId'));

  if (isManager) {
    switch (content) {
      case 'foruminfo':
        return <ForumInfo {...props} />;
        break;
      case 'forumurl':
        return <ForumUrl {...props} />;
        break;
      case 'forumprefix':
        return <ForumPrefix {...props} />;
        break;
      case 'announce':
        return <Announce {...props} />;
        break;
      case 'writepost':
        return <WritePost {...props} />;
        break;
      case 'writecomment':
        return <WriteComment {...props} />;
        break;
      case 'share':
        return <Share {...props} />;
        break;
      case 'promotion':
        return <Promotion {...props} />;
        break;
      case 'managers':
        return <Managers {...props} />;
        break;
      case 'banlist':
        return <BanList {...props} />;
        break;
      case 'spams':
        return <Spams {...props} />;
        break;
      case 'spamreports':
        return <SpamReports {...props} />;
        break;
      case 'stat_forum':
        return <StatForum {...props} />;
        break;
      case 'stat_views':
        return <StatViews {...props} />;
        break;
      case 'stat_visitors':
        return <StatVisitors {...props} />;
        break;
      case 'stat_likerank':
        return <StatLikeRank {...props} />;
        break;
      case 'stat_commentrank':
        return <StatCommentRank {...props} />;
        break;
      case 'stat_viewrank':
        return <StatViewRank {...props} />;
        break;
      default:
        return (
          <div className="ui segments">
            <div className="ui segment">

            </div>
          </div>
        )
    }
  } else {
    return (
      <div>
        권한이 없습니다
      </div>
    )
  }
};

export default ForumSettingsComponent;