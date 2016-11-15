import React from 'react';
import { connect } from 'react-redux';
import Best from '../../Components/Contents/Best';

import { setScrollPosition } from '../../Actions/List';
import { toggleLoginModal } from '../../Actions/Login';

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
    Posts: getDomainState('Posts')
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireSetScrollPosition: setScrollPosition,
    FireToggleLoginModal: toggleLoginModal,
  }
)(BestContainer);
