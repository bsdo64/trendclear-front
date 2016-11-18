import alt from '../../Utils/alt';
import Immutable, { Map } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import DeleteActions from '../../Actions/DeleteActions';
import ModalActions from '../../Actions/ModalActions';
import { initListener, setMergeState } from '../Helper/func';

class RemoveModalStore {
  static get displayName() { return 'RemoveModalStore' }

  constructor() {
    this.displayName = 'RemoveModalStore';

    this.bindActions(DeleteActions);
    this.bindListeners({
      initModal: ModalActions.closeModal
    });
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  initModal() {
    this.setMergeState(Map({}))
  }

  onToggleModal(payload) {
    this.setMergeState(Map(payload.data))
  }
}

export default alt.createStore(immutable(RemoveModalStore), RemoveModalStore.displayName);
