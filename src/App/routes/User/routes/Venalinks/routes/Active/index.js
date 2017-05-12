import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../../../../Selectors/User.js';
import { requestGetMoreActiveVenalinkList } from '../../../../../../Actions/Venalink';
import VenalinkActive from './components/VenalinkActive.js';

class VenalinkActiveList extends React.Component {
  render() {
    return <VenalinkActive {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {
    UserStore: getUser(StoreState),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestGetMoreActiveVenalinkList: requestGetMoreActiveVenalinkList,
  }
)(VenalinkActiveList);
