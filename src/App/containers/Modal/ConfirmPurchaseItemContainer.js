import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import ConfirmBox from '../../components/Modals/Components/ConfirmBox';
import {
  requestPurchaseItem,
  toggleConfirmPurchaseItemModal,
} from '../../Actions/VenacleStore';

class ConfirmPurchaseItemContainer extends React.Component {
  render() {
    return (
      <ConfirmBox
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    UserStore: getUser(StoreState),
    ShoppingStore: getUIState('Shopping'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestPurchaseItem: requestPurchaseItem,
    FireToggleConfirmPurchaseItemModal: toggleConfirmPurchaseItemModal,
  }
)(ConfirmPurchaseItemContainer);
