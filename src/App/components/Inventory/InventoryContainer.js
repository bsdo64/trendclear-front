import React, {
  Component,
} from 'react';
import { connect } from 'react-redux';
import Inventory from './index.js';
import Draggable from 'react-draggable'; // The default
import { getUser } from '../../Selectors/User';
import {
  showItemInfo
} from '../../Actions/VenacleStore.js';

class InventoryContainer extends Component {
  render() {
    const { ShoppingStore, InventoryStore, FireShowItemInfo, Inventories, Venatems, Items, } = this.props;

    const findCommunityInventory = Inventories.find(
      i => i.get('type') === 'community');

    return (
      <div>
        {
          InventoryStore.get('openInventory') &&
          <Draggable
            defaultPosition={{x: 500, y: 300}}
            position={null}
            grid={[10, 10]}
            zIndex={101}>
            <div style={{position: 'absolute'}}>
              <Inventory
                positionStyle="drag"
                inventory={findCommunityInventory}
                Venatems={Venatems}
                Items={Items}
                ShoppingStore={ShoppingStore}
                FireShowItemInfo={FireShowItemInfo}
              />
            </div>
          </Draggable>
        }
      </div>
    );
  }
}

InventoryContainer.propTypes = {};
InventoryContainer.defaultProps = {};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  const getDomainState = function getDomainState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args));
  };

  return {
    ShoppingStore: getUIState('Shopping'),
    InventoryStore: getUIState('Inventory'),
    LoginStore: getUIState('Login'),
    user: getUser(StoreState),

    Venatems: getDomainState('Venatems'),
    Items: getDomainState('Items'),
    Inventories: getDomainState('Inventories'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireShowItemInfo: showItemInfo
  },
)(InventoryContainer);
