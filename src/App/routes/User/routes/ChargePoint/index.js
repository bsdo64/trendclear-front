import React from 'react';
import { getUser } from '../../../../Selectors/User.js';
import { connect } from 'react-redux';
import ChargePointBox from './components/ChargePointBox.js';
import {
  waitingCheckCharge,
  requestCheckPointCharge,
  failureCheckPointCharge,
} from '../../../../Actions/Point';

class ChargePoint extends React.Component {
  render() {
    return <ChargePointBox {...this.props} />;
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
    GnbStore: getUIState('Gnb'),
    LoginStore: getUIState('Login'),
    CommunityStore: getUIState('Community'),
    SearchStore: getUIState('Search'),
    ListStore: getUIState('List'),
    PaginationStore: getUIState('Pagination'),
    ChargePointStore: getUIState('ChargePoint'),
    UserStore: getUser(StoreState),

    Users: getDomainState('Users'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireWaitingCheckCharge: waitingCheckCharge,
    FireRequestCheckPointCharge: requestCheckPointCharge,
    FireFailureCheckPointCharge: failureCheckPointCharge,
  }
)(ChargePoint);
