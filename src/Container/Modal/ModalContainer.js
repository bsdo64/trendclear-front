import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ModalStore from '../../Stores/UI/ModalStore';

import Modal from '../../Components/Modal';

const DefaultModalContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [ModalStore]
  },

  getPropsFromStores() {
    return {
      ModalStore: ModalStore.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<Modal {...this.props} />)
  }
}));


module.exports = DefaultModalContainer;
