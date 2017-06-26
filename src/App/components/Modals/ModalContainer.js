import React from 'react';
import { connect } from 'react-redux';
import Modal from './index';

import { closeModal } from '../../Actions/Modal';

class DefaultModalContainer extends React.Component {
  render() {
    return (<Modal {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    ModalStore: getUIState('Modal'),
  };
};

export default connect(
  mapStateToProps,
  {
    FireCloseModal: closeModal,
  },
)(DefaultModalContainer);
