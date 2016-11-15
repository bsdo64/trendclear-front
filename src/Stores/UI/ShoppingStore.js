import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import VenaStoreActions from '../../Actions/VenaStoreActions';
import { initListener, setMergeState } from '../Helper/func';

const defaultProps = {
  items: [],
  storeModalOpen: false,
  tooltipItemCode: null,
  purchaseItem: null,
  openPurchaseWindow: false
};

class ShoppingStore {
  static displayName = 'ShoppingStore';

  constructor() {

    this.bindActions(VenaStoreActions);
    this.state = Immutable.fromJS(defaultProps);

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onToggleVenacleStore() {
    const newState = this.state.set('storeModalOpen', !this.state.get('storeModalOpen'));
    this.setState(newState);
  }

  onInitItems(res) {
    const newState = this.state.merge(res);
    this.setState(newState);
  }

  onTooltipInit(itemCode) {
    const newState = this.state.merge({ tooltipItemCode: itemCode });
    this.setState(newState);
  }

  onTogglePurchaseWindow(item) {
    const newState = this.state.merge({
      purchaseItem: item ? item : null,
      openPurchaseWindow: !this.state.get('openPurchaseWindow')
    });
    this.setState(newState);
  }

  onRequestPurchaseItem(result) {
    const newState = this.state.merge({
      openPurchaseWindow: !this.state.get('openPurchaseWindow')
    });
    this.setState(newState);
  }
}

export default alt.createStore(immutable(ShoppingStore), ShoppingStore.displayName);
