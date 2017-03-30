import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import WidgetBox from '../../components/WidgetBox';
import { UI, Domains } from '../../Reducers/InitialStates';
import {
  requestPurchaseItem,
  requestShoppingItemInit,
  showItemInfo,
  toggleConfirmPurchaseItemModal,
  toggleVenacleStoreModal,
} from '../../Actions/VenacleStore';
import { toggleAvatarModal, toggleShowInventory } from '../../Actions/User';

class WidgetContainer extends React.Component {
  render() {

    return (<WidgetBox {...this.props} />);
  }
}

WidgetContainer.defaultProps = {
  ShoppingStore: UI.Shopping,
  LoginStore: UI.Login,
  InventoryStore: UI.Inventory,
  UserStore: UI.User,
  Forums: Domains.Forums,
  Venatems: Domains.Venatems,
  Items: Domains.Items,
  Inventories: Domains.Inventories,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    ShoppingStore: getUIState('Shopping'),
    InventoryStore: getUIState('Inventory'),
    LoginStore: getUIState('Login'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Forums: getDomainState('Forums'),
    Venatems: getDomainState('Venatems'),
    Items: getDomainState('Items'),
    Inventories: getDomainState('Inventories'),
  };
};

module.exports = connect(
  mapStateToProps,
  {
    FireRequestPurchaseItem: requestPurchaseItem,
    FireRequestShoppingItemInit: requestShoppingItemInit,
    FireShowItemInfo: showItemInfo,
    FireToggleAvatarModal: toggleAvatarModal,
    FireToggleConfirmPurchaseItemModal: toggleConfirmPurchaseItemModal,
    FireToggleShowInventory: toggleShowInventory,
    FireToggleVenacleStoreModal: toggleVenacleStoreModal,
  },
)(WidgetContainer);
