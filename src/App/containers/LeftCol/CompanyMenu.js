import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import Company from '../../components/LeftMenus/Company';

class MenuContainer extends React.Component {
  render() {
    return <Company {...this.props} />;
  }
}

MenuContainer.propTypes = {
  location: PropTypes.object.isRequired,
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
    ListStore: getUIState('List'),
    GnbStore: getUIState('Gnb'),
    AuthStore: getUIState('Auth'),
    CommunityStore: getUIState('Community'),
    UserStore: getUser(StoreState),

    Forums: getDomainState('Forums'),
    Collections: getDomainState('Collections'),
  };
};

export default connect(
  mapStateToProps,
  {}
)(MenuContainer);
