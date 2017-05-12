import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import { UI, Domains } from '../../Reducers/InitialStates';
import {
  toggleActiveVenalinkModal,
  requestLikePost,
  requestGetMorePostList,
} from '../../Actions/Post';
import {
  requestFollowForum,
  requestUnFollowForum,
  requestGetMoreForumList,
} from '../../Actions/Forum';
import { toggleLoginModal } from '../../Actions/Login';
import { toggleDeleteModal } from '../../Actions/DeleteItem';
import { toggleReportModal } from '../../Actions/Report';
import {
  requestAddForumInCollection,
  requestRemoveForumInCollection,
} from '../../Actions/Collection';
import {
  requestActivateVenalink,
  requestParticipateVenalink,
} from '../../Actions/VenacleStore';
import { setScrollPosition } from '../../Actions/List';

import Search from '../../components/Contents/Search';

class SearchContainer extends React.Component {
  render() {
    return (
      <Search
        {...this.props}
      />
    );
  }
}

SearchContainer.defaultProps = {
  GnbStore: UI.Gnb,
  SearchStore: UI.Search,
  LoginStore: UI.Login,
  CommunityStore: UI.Community,
  ListStore: UI.List,
  AuthStore: UI.Auth,
  PaginationStore: UI.Pagination,

  Collections: Domains.Collections,
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
    GnbStore: getUIState('Gnb'),
    LoginStore: getUIState('Login'),
    CommunityStore: getUIState('Community'),
    SearchStore: getUIState('Search'),

    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),
    UserStore: getUser(StoreState),

    Collections: getDomainState('Collections'),
    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
    Items: getDomainState('Items'),
    Venatems: getDomainState('Venatems'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireSetScrollPosition: setScrollPosition,
    FireRequestGetMorePostList: requestGetMorePostList,
    FireRequestGetMoreForumList: requestGetMoreForumList,
    FireToggleLoginModal: toggleLoginModal,
    FireToggleReportModal: toggleReportModal,
    FireToggleDeleteModal: toggleDeleteModal,
    FireRequestAddForumInCollection: requestAddForumInCollection,
    FireRequestRemoveForumInCollection: requestRemoveForumInCollection,
    FireRequestFollowForum: requestFollowForum,
    FireRequestUnFollowForum: requestUnFollowForum,
    FireRequestLikePost: requestLikePost,
    FireToggleActiveVenalinkModal: toggleActiveVenalinkModal,
    FireRequestActivateVenalink: requestActivateVenalink,
    FireRequestParticipateVenalink: requestParticipateVenalink,
  }
)(SearchContainer);

