import React  from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../../../../Selectors/User.js';
import VenalinkShare from './components/VenalinkShare.js';
import { requestUserPaybackRP } from '../../../../../../Actions/User';
import { requestGetMoreShareVenalinkList } from '../../../../../../Actions/Venalink';

class VenalinkShareList extends React.Component {
  render() {
    return <VenalinkShare {...this.props} />;
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
    FireRequestUserPaybackRP: requestUserPaybackRP,
    FireRequestGetMoreShareVenalinkList: requestGetMoreShareVenalinkList,
  }
)(VenalinkShareList);
