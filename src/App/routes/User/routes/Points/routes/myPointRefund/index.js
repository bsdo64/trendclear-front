import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../../../../Selectors/User';
import { UI, Domains } from '../../../../../../Reducers/InitialStates';
import Refund from './components/refund.js';

class MyPointRefund extends React.Component {
  render() {
    return <Refund {...this.props} />
  }
}

MyPointRefund.defaultProps = {

};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {};
};

export default connect(
  mapStateToProps,
  {

  }
)(MyPointRefund);
