import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

import { connect } from 'react-redux';
import { UI, Domains } from '../../Reducers/InitialStates/index';
import { getUser } from '../../Selectors/User';

import { setScrollPosition } from '../../Actions/List';
import { toggleLoginModal } from '../../Actions/Login';
import {
  toggleActiveVenalinkModal,
  requestLikePost,
  requestGetMorePostList,
} from '../../Actions/Post';
import { toggleReportModal } from '../../Actions/Report';
import { toggleDeleteModal } from '../../Actions/DeleteItem';
import {
  requestParticipateVenalink,
  requestActivateVenalink,
} from '../../Actions/VenacleStore';

import ActivityHeader from './components/Header/index.js';
import InfiniteList from '../../components/List/InfiniteList.js';
import InfiniteLoader from '../../components/Loader/InfiniteLoader.js';

require('./index.scss');
const ActivityBox = props => {

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

  if (UserStore && UserStore.get('user')) {
    return (
      <div id="activity">
        <ActivityHeader
          UserStore={UserStore}
          ActivityStore={ActivityStore}
          context={context}
        />

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

class ActivityContainer extends React.Component {
  render() {
    return (<ActivityBox {...this.props} />);
  }
}

ActivityContainer.defaultProps = {
  ActivityStore: UI.Activity,
  ListStore: UI.List,
  AuthStore: UI.Auth,
  PaginationStore: UI.Pagination,

  Forums: Domains.Forums,
  Users: Domains.Users,
  Posts: Domains.Posts,
  Venatems: Domains.Venatems,
  Items: Domains.Items,
};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    ActivityStore: getUIState('Activity'),
    LoginModalStore: getUIState('LoginModal'),
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),
    UserStore: getUser(StoreState),

    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
    Items: getDomainState('Items'),
    Venatems: getDomainState('Venatems'),
  };
};

module.exports = connect(
  mapStateToProps,
  {
    FireSetScrollPosition: setScrollPosition,
    FireToggleLoginModal: toggleLoginModal,
    FireRequestGetMorePostList: requestGetMorePostList,
    FireToggleDeleteModal: toggleDeleteModal,
    FireToggleReportModal: toggleReportModal,
    FireRequestLikePost: requestLikePost,
    FireToggleActiveVenalinkModal: toggleActiveVenalinkModal,
    FireRequestActivateVenalink: requestActivateVenalink,
    FireRequestParticipateVenalink: requestParticipateVenalink,
  },
)(ActivityContainer);
