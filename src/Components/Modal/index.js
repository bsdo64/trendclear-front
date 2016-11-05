/**
 * Created by dobyeongsu on 2016. 11. 4..
 */
import React from 'react';
import Modal from 'react-modal';
import LoginContainer from '../../Container/Modal/LoginModalContainer';
import ReportContainer from '../../Container/Modal/ReportModalContainer';
import AvatarImageContainer from '../../Container/Modal/AvatarImageContainer';
import DeleteItemContainer from '../../Container/Modal/DeleteModalContainer';
import ModalActions from '../../Actions/ModalActions';

const ModalBox = React.createClass({
  componentWillUnmount() {
    if (this.el) {
      this.el.removeEventListener('click', this.eventHandler, false);
    }
  },

  afterOpenModal() {
    this.el = this.refs.modal.node;
    if (this.el) {
      this.el.addEventListener('click', this.eventHandler, false);
    }
  },

  eventHandler(e) {
    console.log(e.target);
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
      <div onClick={this.eventHandler}>
        <Modal
          ref={'modal'}
          overlayClassName={'ui dimmer modals page transition visible active ' + (openModal ? '' : 'fade out')}
          className="ui small modal gb_login scrolling transition visible active "
          isOpen={openModal}
          closeTimeoutMS={500}
          //{/*onAfterOpen={/!*this.afterOpenModal*!/}*/}
          onRequestClose={this.closeModal}
        >
          {children}
        </Modal>
      </div>
    );
  }
});

export default ModalBox;