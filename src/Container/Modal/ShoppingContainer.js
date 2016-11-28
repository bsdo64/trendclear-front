import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Shopping from '../../Components/Modal/Components/Shopping';
import {
  showItemInfo,
  toggleVenacleStoreModal,
  toggleConfirmPurchaseItemModal,
  requestShoppingItemInit,
  requestPurchaseItem,
} from '../../Actions/VenacleStore';

const ShoppingContainer = React.createClass({
  render() {
    return (<Shopping {...this.props} />)
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    ShoppingStore: getUIState('Shopping'),
    ReportStore: getUIState('Report'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Posts: getDomainState('Posts'),
    Comments: getDomainState('Comments'),
    SubComments: getDomainState('SubComments'),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireToggleVenacleStoreModal: toggleVenacleStoreModal,
    FireToggleConfirmPurchaseItemModal: toggleConfirmPurchaseItemModal,
    FireRequestShoppingItemInit: requestShoppingItemInit,
    FireRequestPurchaseItem: requestPurchaseItem,
    FireShowItemInfo: showItemInfo,
  }
)(ShoppingContainer);
