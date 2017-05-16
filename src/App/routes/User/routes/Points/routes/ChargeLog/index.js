import React from 'react';
import { getUser } from '../../../../../../Selectors/User';
import { connect } from 'react-redux';
import ChargeLogListBox from './components/ChargeLogListBox.js';
import {
  requestGetMoreChargeLogList,
  getVbankInfo,
} from '../../../../../../Actions/Point';

class ChargeLogList extends React.Component{
  render() {
    return <ChargeLogListBox {...this.props} />;
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
    FireRequestGetMoreChargeLogList: requestGetMoreChargeLogList,
    FireGetVbankInfo: getVbankInfo,
  }
)(ChargeLogList);
