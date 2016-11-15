import React from 'react';
import { connect } from 'react-redux';
import Best from '../../Components/Contents/Best';

const BestContainer = React.createClass({
  render() {
    return (
      <Best listName="collectionBestPostList"
            {...this.props} />
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
    LoginModalStore: getUIState('LoginModal'),
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    PaginationStore: getUIState('Pagination'),

    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(BestContainer);
