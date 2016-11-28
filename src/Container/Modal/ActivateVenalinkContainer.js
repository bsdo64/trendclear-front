import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import ActivateVenalink from '../../Components/Modal/Components/ActivateVenalink';
import {
  requestActivateVenalink,
} from '../../Actions/VenacleStore';

const ActivateVenalinkContainer = React.createClass({
  render() {
    return (<ActivateVenalink {...this.props} />)
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
    ShareLinkStore: getUIState('ShareLink'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireRequestActivateVenalink: requestActivateVenalink
  }
)(ActivateVenalinkContainer);
