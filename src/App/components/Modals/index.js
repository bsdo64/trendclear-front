/**
 * Created by dobyeongsu on 2016. 11. 4..
 */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { UI } from '../../Reducers/InitialStates';
import LoginContainer from '../../containers/Modal/LoginModalContainer';
import ReportContainer from '../../containers/Modal/ReportModalContainer';
import AvatarImageContainer from '../../containers/Modal/AvatarImageContainer';
import DeleteItemContainer from '../../containers/Modal/DeleteModalContainer';
import ShoppingContainer from '../../containers/Modal/ShoppingContainer';
import ActivateVenalinkContainer from '../../containers/Modal/ActivateVenalinkContainer';
import ConfirmPurchaseItemContainer from '../../containers/Modal/ConfirmPurchaseItemContainer';

require('./index.scss');
const ModalBox = props => {
  function proxyContainer(type) {
    switch (type) {
      case 'Login':
        return <LoginContainer />;
      case 'Report':
        return <ReportContainer />;
      case 'AvatarImage':
        return <AvatarImageContainer />;
      case 'DeleteItem':
        return <DeleteItemContainer />;
      case 'Shopping':
        return <ShoppingContainer />;
      case 'ActivateVenalink':
        return <ActivateVenalinkContainer />;
      case 'ConfirmPurchaseItem':
        return <ConfirmPurchaseItemContainer />;
      case 'Close':
        return <div></div>;

      default:
        return (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">로딩중..</div>
          </div>
        );
    }
  }
  function closeModal() {
    props.FireCloseModal();
  }

  function afterOpenModal() {

  }

  function createModals(modal, key) {
    const openModal = modal.openModal;
    const contentType = modal.contentType;
    const children = proxyContainer(contentType);

    return (
      <Modal
        key={key}
        overlayClassName={'ui dimmer modals page visible active'}
        className={`ui small modal scrolling visible active Content-${contentType}`}
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        {children}

      </Modal>
    );
  }

  const {ModalStore} = props;
  const modals = ModalStore.get('modals');
  const modalsArray = modals.toJS();

  if (modals.size === 0) {
    return <div/>;
  }

  return <div>
    {
      modalsArray.map(createModals)
    }
  </div>;
};

ModalBox.displayName = 'ModalBox';
ModalBox.propTypes = {
  FireCloseModal: PropTypes.func.isRequired,
  ModalStore: PropTypes.object.isRequired,
};
ModalBox.defaultProps = {
  ModalStore: UI.Modal,
};

export default ModalBox;
