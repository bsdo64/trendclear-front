import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Search from '../../Components/Contents/Search';
import { UI, Domains } from '../../Reducers/InitialStates';

import { setScrollPosition } from '../../Actions/List';
import { requestLikePost, requestGetMorePostList } from '../../Actions/Post';
import { requestFollowForum, requestUnFollowForum, requestGetMoreForumList } from '../../Actions/Forum';
import { toggleLoginModal } from '../../Actions/Login';
import { toggleDeleteModal } from '../../Actions/DeleteItem';
import { toggleReportModal } from '../../Actions/Report';
import { requestAddForumInCollection, requestRemoveForumInCollection } from '../../Actions/Collection';

const SearchContainer = React.createClass({
  render() {
    return (
      <Search
        {...this.props}
      />
    )
  }
});

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
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    GnbStore: getUIState('Gnb'),
    LoginStore: getUIState('Login'),
    CommunityStore: getUIState('Community'),
    SearchStore: getUIState('Search'),

    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Collections: getDomainState('Collections'),
    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts')
  }
};

module.exports = connect(
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
  }
)(SearchContainer);

