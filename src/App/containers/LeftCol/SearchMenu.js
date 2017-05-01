import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchMenu from '../../components/LeftMenus/SearchMenu';

class MenuContainer extends React.Component {
  render() {
    return <SearchMenu {...this.props} />;
  }
}

MenuContainer.propTypes = {
  SearchStore: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    SearchStore: getUIState('Search'),
  };
};

module.exports = connect(
  mapStateToProps,
  {}
)(MenuContainer);
