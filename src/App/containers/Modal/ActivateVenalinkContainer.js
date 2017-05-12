import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLoginUser } from '../Util/func';
import ActivateVenalink from '../../components/Modals/Components/ActivateVenalink';
import {
  requestActivateVenalink,
  toggleVenacleStoreModal,
} from '../../Actions/VenacleStore';

class ActivateVenalinkContainer extends React.Component {
  render() {
    return (<ActivateVenalink {...this.props} />);
  }
}

const mapStateToProps = (state) => {
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
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  };
};

export default withRouter(connect(
  mapStateToProps,
  {
    FireRequestActivateVenalink: requestActivateVenalink,
    FireToggleVenacleStoreModal: toggleVenacleStoreModal,
  },
)(ActivateVenalinkContainer));
