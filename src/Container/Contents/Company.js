import React from 'react';
import {connect} from 'react-redux';
import {getLoginUser} from '../Util/func';

import Company from '../../Components/Contents/Company';

const CompanyContainer = React.createClass({
  render() {
    return (<Company {...this.props} />)
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    LoginStore: getUIState('Login'),
    CommunityStore: getUIState('Community'),
    LoginModalStore: getUIState('LoginModal'),
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Collections: getDomainState('Collections'),
    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
    Comments: getDomainState('Comments'),
    SubComments: getDomainState('SubComments'),
    Prefixes: getDomainState('Prefixes'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyContainer);

