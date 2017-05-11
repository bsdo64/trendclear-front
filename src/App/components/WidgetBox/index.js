import React from 'react';
import { connect } from 'react-redux';
import WidgetBox from './WidgetBox.js';
import { UI, Domains } from '../../Reducers/InitialStates/index.js';
import {
  requestPurchaseItem,
  requestShoppingItemInit,
  toggleConfirmPurchaseItemModal,
  toggleVenacleStoreModal,
} from '../../Actions/VenacleStore.js';
import { getWidgetBox } from '../../Selectors/WidgetBox';
import { getUser } from '../../Selectors/User.js';
import { toggleTrendBox } from '../../Actions/WidgetBox';
import { toggleAvatarModal, toggleShowInventory } from '../../Actions/User.js';

class WidgetContainer extends React.Component {
  render() {

    return (<WidgetBox {...this.props} />);
  }
}

WidgetContainer.defaultProps = {
  ShoppingStore: UI.Shopping,
  LoginStore: UI.Login,
  InventoryStore: UI.Inventory,
  Forums: Domains.Forums,
  Venatems: Domains.Venatems,
  Items: Domains.Items,
  Inventories: Domains.Inventories,
};

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
    InventoryStore: getUIState('Inventory'),
    LoginStore: getUIState('Login'),
    user: getUser(StoreState),

    Forums: getDomainState('Forums'),
    Venatems: getDomainState('Venatems'),
    Items: getDomainState('Items'),
    Inventories: getDomainState('Inventories'),
    widgetBox: getWidgetBox(StoreState),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestPurchaseItem: requestPurchaseItem,
    FireRequestShoppingItemInit: requestShoppingItemInit,
    FireToggleAvatarModal: toggleAvatarModal,
    FireToggleConfirmPurchaseItemModal: toggleConfirmPurchaseItemModal,
    FireToggleShowInventory: toggleShowInventory,
    FireToggleVenacleStoreModal: toggleVenacleStoreModal,
    FireToggleTrendBox: toggleTrendBox,
  },
)(WidgetContainer);
