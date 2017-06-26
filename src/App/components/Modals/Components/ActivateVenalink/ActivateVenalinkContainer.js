import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getUser } from '../../../../Selectors/User.js';
import ActivateVenalink from './index';
import {
  requestActivateVenalink,
  toggleVenacleStoreModal,
} from '../../../../Actions/VenacleStore';
import {
  closeModal,
} from '../../../../Actions/Modal';

class ActivateVenalinkContainer extends React.Component {
  render() {
    return (<ActivateVenalink {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    Inventories: getDomainState('Inventories'),
    Items: getDomainState('Items'),
    Venatems: getDomainState('Venatems'),
    ShareLinkStore: getUIState('ShareLink'),
    UserStore: getUser(StoreState),
  };
};

export default withRouter(connect(
  mapStateToProps,
  {
    FireRequestActivateVenalink: requestActivateVenalink,
    FireToggleVenacleStoreModal: toggleVenacleStoreModal,
    FireCloseModal: closeModal,
  },
)(ActivateVenalinkContainer));
