import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import ForumSettingsComponent from '../../components/Contents/ForumSetting';
import { UI, Domains } from '../../Reducers/InitialStates';
import {
  handleResetButton,
  handleChangeFormForumMeta,
  requestUpdateForumMeta,
  requestAddForumPrefix,
  requestDeleteForumPrefix,
  requestUpdateForumPrefix,
  requestAddForumManager,
  requestDeleteForumManager,
  requestDeleteForumAnnounce,
  requestAddForumBanUser,
  requestDeleteForumBanUser,
  requestPostForumImage,
} from '../../Actions/ForumSetting';

class ForumSettingsContainer extends React.Component {
  render() {
    return (<ForumSettingsComponent {...this.props} />);
  }
}

ForumSettingsContainer.defaultProps = {
  LoginStore: UI.Login,
  CommunityStore: UI.Community,
  ListStore: UI.List,
  AuthStore: UI.Auth,
  PaginationStore: UI.Pagination,
  ForumSettingStore: UI.ForumSetting,

  Collections: Domains.Collections,
  Forums: Domains.Forums,
  Users: Domains.Users,
  Posts: Domains.Posts,
  Prefixes: Domains.Prefixes,
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
    CommunityStore: getUIState('Community'),
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),
    ForumSettingStore: getUIState('ForumSetting'),
    UserStore: getUser(StoreState),

    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
    Prefixes: getDomainState('Prefixes'),
    Collections: getDomainState('Collections'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireHandleResetButton: handleResetButton,
    FireHandleChangeFormForumMeta: handleChangeFormForumMeta,
    FireRequestUpdateForumMeta: requestUpdateForumMeta,
    FireRequestAddForumPrefix: requestAddForumPrefix,
    FireRequestDeleteForumPrefix: requestDeleteForumPrefix,
    FireRequestUpdateForumPrefix: requestUpdateForumPrefix,
    FireRequestAddForumManager: requestAddForumManager,
    FireRequestDeleteForumManager: requestDeleteForumManager,
    FireRequestDeleteForumAnnounce: requestDeleteForumAnnounce,
    FireRequestAddForumBanUser: requestAddForumBanUser,
    FireRequestDeleteForumBanUser: requestDeleteForumBanUser,
    FireRequestPostForumImage: requestPostForumImage,
  }
)(ForumSettingsContainer);
