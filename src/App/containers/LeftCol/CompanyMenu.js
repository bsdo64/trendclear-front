import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
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
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Forums: getDomainState('Forums'),
    Collections: getDomainState('Collections'),
  };
};

export default connect(
  mapStateToProps,
  {}
)(MenuContainer);
