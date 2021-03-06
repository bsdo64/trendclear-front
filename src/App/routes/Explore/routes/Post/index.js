import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Best from '../../../../components/Contents/Best/index';
import { UI, Domains } from '../../../../Reducers/InitialStates/index';

import { setScrollPosition } from '../../../../Actions/List';
import { toggleLoginModal } from '../../../../Actions/Login';
import {
  toggleActiveVenalinkModal,
  requestLikePost,
  requestGetMorePostList,
  setFocusCurrentPost,
} from '../../../../Actions/Post';
import { toggleReportModal } from '../../../../Actions/Report';
import { toggleDeleteModal } from '../../../../Actions/DeleteItem';
import {
  requestActivateVenalink,
  requestParticipateVenalink,
} from '../../../../Actions/VenacleStore';

class BestContainer extends React.Component {
  render() {
    return (
      <Best listName="exploreMainPosts"
            listType="all"
            {...this.props}
      />
    );
  }
}

BestContainer.defaultProps = {
  GnbStore: UI.Gnb,
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
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),
    GnbStore: getUIState('Gnb'),

    Forums: getDomainState('Forums'),
    Items: getDomainState('Items'),
    Venatems: getDomainState('Venatems'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
  };
};

const ExplorePost = withRouter(connect(
  mapStateToProps,
  {
    FireSetScrollPosition: setScrollPosition,
    FireToggleLoginModal: toggleLoginModal,
    FireToggleDeleteModal: toggleDeleteModal,
    FireToggleReportModal: toggleReportModal,
    FireRequestGetMorePostList: requestGetMorePostList,
    FireRequestLikePost: requestLikePost,
    FireToggleActiveVenalinkModal: toggleActiveVenalinkModal,
    FireRequestActivateVenalink: requestActivateVenalink,
    FireRequestParticipateVenalink: requestParticipateVenalink,
    FireSetFocusCurrentPost: setFocusCurrentPost,
  },
)(BestContainer));

export default ExplorePost;