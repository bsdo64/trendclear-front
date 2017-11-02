import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../../../../Selectors/User.js';
import { requestGetMoreActiveVenalinkList } from '../../../../../../Actions/Venalink';
import VenalinkActive from './components/VenalinkActive.js';
import { getUserVenalinks } from '../../../../../../Selectors/Venalinks';
import { getCollection } from '../../../../../../Selectors/Pagination';

class VenalinkActiveList extends React.Component {
  render() {
    return <VenalinkActive {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {
    UserStore: getUser(StoreState),
    venalinks: getUserVenalinks(StoreState),
    venalinkPage: getCollection('userVenalinks')(StoreState)
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestGetMoreActiveVenalinkList: requestGetMoreActiveVenalinkList,
  }
)(VenalinkActiveList);
