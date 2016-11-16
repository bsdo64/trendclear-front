import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import ForumSettingsComponent from '../../Components/Contents/ForumSetting';
import { UI, Domains } from '../../Reducers/InitialStates';

const ForumSettingsContainer = React.createClass({
  render() {

    return (<ForumSettingsComponent {...this.props} />)
  }
});

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
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    CommunityStore: getUIState('Community'),
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),
    ForumSettingStore: getUIState('ForumSetting'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
    Prefixes: getDomainState('Prefixes'),
    Collections: getDomainState('Collections'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumSettingsContainer);
