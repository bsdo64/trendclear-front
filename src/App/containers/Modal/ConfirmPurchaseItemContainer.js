import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
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
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
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
