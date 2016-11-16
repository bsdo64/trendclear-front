import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Search from '../../Components/Contents/Search';

import { setScrollPosition } from '../../Actions/List';
import { toggleLoginModal } from '../../Actions/Login';

const SearchContainer = React.createClass({
  render() {
    return (
      <Search
        {...this.props}
      />
    )
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
    FireToggleLoginModal: toggleLoginModal,
  }
)(SearchContainer);

