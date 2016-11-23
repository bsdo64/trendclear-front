import React from 'react';
import { connect } from 'react-redux';
import Best from '../../Components/Contents/Best';
import { UI, Domains } from '../../Reducers/InitialStates';

import { setScrollPosition } from '../../Actions/List';
import { toggleLoginModal } from '../../Actions/Login';
import { toggleActiveVenalinkModal, requestLikePost, requestGetMorePostList } from '../../Actions/Post';
import { toggleReportModal } from '../../Actions/Report';
import { toggleDeleteModal } from '../../Actions/DeleteItem';

const BestContainer = React.createClass({
  render() {
    return (
      <div>
        <Best listName="bestPostList"
              {...this.props}
        />
      </div>
    )
  }
});

BestContainer.defaultProps = {
  GnbStore: UI.Gnb,
  ListStore: UI.List,
  AuthStore: UI.Auth,
  PaginationStore: UI.Pagination,

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
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),
    GnbStore: getUIState('Gnb'),

    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireSetScrollPosition: setScrollPosition,
    FireToggleLoginModal: toggleLoginModal,
    FireToggleDeleteModal: toggleDeleteModal,
    FireToggleReportModal: toggleReportModal,
    FireRequestGetMorePostList: requestGetMorePostList,
    FireRequestLikePost: requestLikePost,
    FireToggleActiveVenalinkModal: toggleActiveVenalinkModal,
  }
)(BestContainer);
