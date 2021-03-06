import React from 'react';
import { connect } from 'react-redux';
import Best from '../../components/Contents/Best';
import { UI, Domains } from '../../Reducers/InitialStates';

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
  requestActivateVenalink,
  requestParticipateVenalink,
} from '../../Actions/VenacleStore';

class BestContainer extends React.Component {
  render() {
    return (
      <div>
        <Best listName="collectionBestPostList"
              {...this.props}
        />
      </div>
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
  Collections: Domains.Collections,
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
    Collections: getDomainState('Collections'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireSetScrollPosition: setScrollPosition,
    FireToggleLoginModal: toggleLoginModal,
    FireToggleReportModal: toggleReportModal,
    FireToggleDeleteModal: toggleDeleteModal,
    FireRequestGetMorePostList: requestGetMorePostList,
    FireRequestLikePost: requestLikePost,
    FireToggleActiveVenalinkModal: toggleActiveVenalinkModal,
    FireRequestActivateVenalink: requestActivateVenalink,
    FireRequestParticipateVenalink: requestParticipateVenalink,
  }
)(BestContainer);
