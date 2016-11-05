import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class ModalActions {
  closeModal() {
    return false;
  }
}

export default alt.createActions(ModalActions);
