import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Activity from '../../Components/Contents/Activity';
import { UI, Domains } from '../../Reducers/InitialStates';

import { setScrollPosition } from '../../Actions/List';
import { toggleLoginModal } from '../../Actions/Login';
import { toggleActiveVenalinkModal, requestLikePost, requestGetMorePostList } from '../../Actions/Post';
import { toggleReportModal } from '../../Actions/Report';
import { toggleDeleteModal } from '../../Actions/DeleteItem';

const ActivityContainer = React.createClass({
  render() {
    return (<Activity {...this.props} />)
  }
});

ActivityContainer.defaultProps = {
  ActivityStore: UI.Activity,
  ListStore: UI.List,
  AuthStore: UI.Auth,
  PaginationStore: UI.Pagination,

  Forums: Domains.Forums,
  Users: Domains.Users,
  Posts: Domains.Posts
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    ActivityStore: getUIState('Activity'),
    LoginModalStore: getUIState('LoginModal'),
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts')
  }
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
  }
)(ActivityContainer);
