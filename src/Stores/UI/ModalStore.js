import alt from '../../Utils/alt';
import Immutable, { fromJS } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import { initListener, setMergeState } from '../Helper/func';
import LoginActions from '../../Actions/LoginActions';
import UserActions from '../../Actions/UserActions';
import ReportActions from '../../Actions/ReportActions';
import DeleteActions from '../../Actions/DeleteActions';
import ModalActions from '../../Actions/ModalActions';
import VenaStoreActions from '../../Actions/VenaStoreActions';
import PostActions from '../../Actions/PostActions';

class ModalStore {
  static get displayName() { return 'ModalStore' }

  constructor() {
    this.displayName = 'ModalStore';

    this.bindListeners({
      closeModal: [
        LoginActions.closeLoginModal,
        ModalActions.closeModal,
        DeleteActions.delete
      ],
      toggleModal: [
        UserActions.toggleAvatarModal,
        DeleteActions.toggleModal,
        LoginActions.toggleLoginModal,
        ReportActions.toggleReportModal,
        VenaStoreActions.toggleVenacleStore,
        PostActions.toggleActivateVenalinkModal
      ],
    });

    this.state = Immutable.Map({
      contentType: null,
      openModal: false,
      location: null
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  toggleModal({ location, contentType }) {
    const modalState = this.state.get('openModal');
    this.setState(this.state.merge({
      contentType: contentType,
      openModal: !modalState,
      location: modalState ? location : null
    }));
  }

  closeModal() {
    this.setMergeState(fromJS({
      openModal: false,
      contentType: 'Close'
    }));
  }
}

export default alt.createStore(immutable(ModalStore), ModalStore.displayName);
