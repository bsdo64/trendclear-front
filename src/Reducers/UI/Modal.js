import { Map } from 'immutable';
import { TOGGLE_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from '../../Actions/Login';
import { CLOSE_MODAL } from '../../Actions/Modal';

const initState = Map({
  contentType: null,
  openModal: false,
  location: null
});

const Modal = (state = initState, action) => {
  switch (action.type) {

    case TOGGLE_LOGIN_MODAL: {
      const modalState = state.get('openModal');
      return state.merge({
        contentType: action.contentType,
        openModal: !modalState,
        location: modalState ? action.location : null
      })
    }

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
