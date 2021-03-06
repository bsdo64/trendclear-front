import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../../Selectors/User.js';
import Shopping from './index';
import {
  showItemInfo,
  toggleVenacleStoreModal,
  toggleConfirmPurchaseItemModal,
  requestShoppingItemInit,
} from '../../../../Actions/VenacleStore';

class ShoppingContainer extends React.Component {
  render() {
    return (<Shopping {...this.props} />);
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
    ShoppingStore: getUIState('Shopping'),
    ReportStore: getUIState('Report'),
    UserStore: getUser(StoreState),

    Venatems: getDomainState('Venatems'),
    Items: getDomainState('Items'),
    Inventories: getDomainState('Inventories'),
    Posts: getDomainState('Posts'),
    Comments: getDomainState('Comments'),
    SubComments: getDomainState('SubComments'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireToggleVenacleStoreModal: toggleVenacleStoreModal,
    FireToggleConfirmPurchaseItemModal: toggleConfirmPurchaseItemModal,
    FireRequestShoppingItemInit: requestShoppingItemInit,
    FireShowItemInfo: showItemInfo,
  }
)(ShoppingContainer);
