import React from 'react';
import { connect } from 'react-redux';
import Best from '../../Components/Contents/Best';
import { UI, Domains } from '../../Reducers/InitialStates';

import { setScrollPosition } from '../../Actions/List';
import { toggleLoginModal } from '../../Actions/Login';
import { toggleReportModal } from '../../Actions/Report';
import { toggleActiveVenalinkModal, requestLikePost, requestGetMorePostList } from '../../Actions/Post';
import { toggleDeleteModal } from '../../Actions/DeleteItem';

const BestContainer = React.createClass({
  render() {
    return (
      <Best listName="collectionBestPostList"
            {...this.props} />
    )
  }
});

BestContainer.defaultProps = {
  ListStore: UI.List,
  AuthStore: UI.Auth,
  PaginationStore: UI.Pagination,
  GnbStore: UI.Gnb,
  Collections: Domains.Collections,
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
    LoginModalStore: getUIState('LoginModal'),
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),

    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
    Collections: getDomainState('Collections'),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireSetScrollPosition: setScrollPosition,
    FireToggleLoginModal: toggleLoginModal,
    FireToggleReportModal: toggleReportModal,
    FireToggleDeleteModal: toggleDeleteModal,
    FireRequestGetMorePostList: requestGetMorePostList,
    FireRequestLikePost: requestLikePost,
    FireToggleActiveVenalinkModal: toggleActiveVenalinkModal,
  }
)(BestContainer);
