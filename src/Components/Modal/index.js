/**
 * Created by dobyeongsu on 2016. 11. 4..
 */
import React from 'react';
import Modal from 'react-modal';
import LoginContainer from '../../Container/Modal/LoginModalContainer';
import ReportContainer from '../../Container/Modal/ReportModalContainer';
import AvatarImageContainer from '../../Container/Modal/AvatarImageContainer';
import DeleteItemContainer from '../../Container/Modal/DeleteModalContainer';
import ShoppingContainer from '../../Container/Modal/ShoppingContainer';
import ActivateVenalinkContainer from '../../Container/Modal/ActivateVenalinkContainer';
import ModalActions from '../../Actions/ModalActions';

require('./index.scss');
const ModalBox = React.createClass({
  componentWillUnmount() {
    $(document).off('click', '.ui.dimmer.modals', this.stopPropagation, false);
  },

  componentDidMount() {
    // Listener bound to `document`, event delegation
    $(document).on('click', '.ui.dimmer.modals', this.stopPropagation, false);
  },

  stopPropagation(e) {
    e.stopPropagation();
  },

  proxyContainer(type) {
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

      case 'Close':
        return <div></div>;

      default:
        return (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">로딩중..</div>
          </div>
        );
    }
  },
  closeModal() {
    ModalActions.closeModal();
  },
  render() {
    const { ModalStore } = this.props;
    const openModal = ModalStore.get('openModal');
    const contentType = ModalStore.get('contentType');
    const children = this.proxyContainer(contentType);

    return (
      <Modal
        ref={'modal'}
        overlayClassName={'ui dimmer modals page transition visible active ' + (openModal ? '' : 'fade out')}
        className={`ui small modal scrolling transition visible active Content-${contentType}`}
        isOpen={openModal}
        closeTimeoutMS={500}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
      >
        {children}

      </Modal>
    );
  }
});

export default ModalBox;