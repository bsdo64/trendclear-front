import { UI } from '../InitialStates';
import { TOGGLE_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from '../../Actions/Login';
import { TOGGLE_REPORT_MODAL, CLOSE_REPORT_MODAL } from '../../Actions/Report';
import { CLOSE_MODAL } from '../../Actions/Modal';

const Modal = (state = UI.Modal, action) => {
  switch (action.type) {

    case TOGGLE_REPORT_MODAL:
    case TOGGLE_LOGIN_MODAL: {
      const modalState = state.get('openModal');
      return state.merge({
        contentType: action.contentType,
        openModal: !modalState,
        location: modalState ? action.location : null
      })
    }

    case CLOSE_REPORT_MODAL:
    case CLOSE_LOGIN_MODAL:
    case CLOSE_MODAL: {
      return state.merge({
        openModal: false,
        contentType: 'Close'
      })
    }

    default:
      return state
  }
};

export default Modal;
