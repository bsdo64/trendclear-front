import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../components/Modals';

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

module.exports = connect(
  mapStateToProps,
  {
    FireCloseModal: closeModal,
  },
)(DefaultModalContainer);
