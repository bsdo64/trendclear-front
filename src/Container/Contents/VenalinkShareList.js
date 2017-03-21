import React  from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import { requestUserPaybackRP } from '../../Actions/User';
import VenalinkShare from '../../Components/Contents/Venalinks/VenalinkShare';
import { requestGetMoreShareVenalinkList } from '../../Actions/Venalink';

const VenalinkShareList = React.createClass({
  render() {
    return <VenalinkShare {...this.props} />;
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
    FireRequestUserPaybackRP: requestUserPaybackRP,
    FireRequestGetMoreShareVenalinkList: requestGetMoreShareVenalinkList,
  }
)(VenalinkShareList);
