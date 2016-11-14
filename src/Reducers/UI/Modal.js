import {Map} from 'immutable';

const initState = Map({
  contentType: null,
  openModal: false,
  location: null
});


const Modal = (state = initState, action) => {
  switch(action.type) {

    default: return state
  }
};

export default Modal;
