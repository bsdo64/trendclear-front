import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User';
import Community from './components/Community/index';
import { Domains, UI } from '../../Reducers/InitialStates/index';

import { setScrollPosition } from '../../Actions/List';
import { toggleLoginModal } from '../../Actions/Login';
import { toggleReportModal } from '../../Actions/Report';
import { requestFollowForum, requestUnFollowForum } from '../../Actions/Forum';
import { requestAddForumInCollection, requestRemoveForumInCollection } from '../../Actions/Collection';
import { toggleDeleteModal } from '../../Actions/DeleteItem';
import { requestLikePost, toggleActiveVenalinkModal } from '../../Actions/Post';
import {
  closeCommentUpdateView,
  openCommentUpdateView,
  requestLikeComment,
  requestLikeSubComment,
  requestSubmitComment,
  requestSubmitSubComment,
  requestUpdateComment,
  requestUpdateSubComment
} from '../../Actions/Comment';
import { requestActivateVenalink, requestParticipateVenalink } from '../../Actions/VenacleStore';

class CommunityContainer extends React.Component {
  render() {
    return (<Community {...this.props} />);
  }
}

CommunityContainer.defaultProps = {
  LoginStore: UI.Login,
  ListStore: UI.List,
  AuthStore: UI.Auth,
  ForumStore: UI.Forum,
  PaginationStore: UI.Pagination,

  Collections: Domains.Collections,
  Forums: Domains.Forums,
  Users: Domains.Users,
  Posts: Domains.Posts,
  Comments: Domains.Comments,
  SubComments: Domains.SubComments,
  Prefixes: Domains.Prefixes,
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
    LoginStore: getUIState('Login'),
    CommunityStore: getUIState('Community'),
    LoginModalStore: getUIState('LoginModal'),
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    ForumStore: getUIState('Forum'),
    PaginationStore: getUIState('Pagination'),
    UserStore: getUser(StoreState),

    Collections: getDomainState('Collections'),
    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
    Comments: getDomainState('Comments'),
    SubComments: getDomainState('SubComments'),
    Prefixes: getDomainState('Prefixes'),
    Items: getDomainState('Items'),
    Venatems: getDomainState('Venatems'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireSetScrollPosition: setScrollPosition,
    FireToggleLoginModal: toggleLoginModal,
    FireToggleReportModal: toggleReportModal,
    FireToggleDeleteModal: toggleDeleteModal,
    FireRequestAddForumInCollection: requestAddForumInCollection,
    FireRequestRemoveForumInCollection: requestRemoveForumInCollection,
    FireRequestFollowForum: requestFollowForum,
    FireRequestUnFollowForum: requestUnFollowForum,
    FireRequestLikePost: requestLikePost,
    FireRequestLikeComment: requestLikeComment,
    FireRequestLikeSubComment: requestLikeSubComment,
    FireRequestSubmitComment: requestSubmitComment,
    FireRequestSubmitSubComment: requestSubmitSubComment,
    FireRequestUpdateComment: requestUpdateComment,
    FireRequestUpdateSubComment: requestUpdateSubComment,
    FireOpenCommentUpdateView: openCommentUpdateView,
    FireCloseCommentUpdateView: closeCommentUpdateView,
    FireToggleActiveVenalinkModal: toggleActiveVenalinkModal,
    FireRequestActivateVenalink: requestActivateVenalink,
    FireRequestParticipateVenalink: requestParticipateVenalink,
  }
)(CommunityContainer);
