import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import VenalinkActive from '../../components/Contents/Venalinks/VenalinkActive';
import { requestGetMoreActiveVenalinkList } from '../../Actions/Venalink';

const VenalinkActiveList = React.createClass({

  render() {
    return <VenalinkActive {...this.props} />;
  },
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  };
};

module.exports = connect(
  mapStateToProps,
  {
    FireRequestGetMoreActiveVenalinkList: requestGetMoreActiveVenalinkList,
  }
)(VenalinkActiveList);