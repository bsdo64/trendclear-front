import React from 'react';
import cx from 'classnames';
import DeleteActions from '../../Actions/DeleteActions';
import Modal from 'react-modal';

require('./index.scss');
const DeleteModalBox = React.createClass({
  displayName: 'DeleteModalBox',
  
  getInitialState() {
    return {
      selectItem: 1
    }
  },

  closeModal: function() {
    DeleteActions.closeModal();
  },
  selectReportItem(e) {
    "use strict";

    const reportId = e.target.dataset.id;
    const reportMessage = e.target.dataset.message;
    this.setState({
      selectItem: parseInt(reportId, 10),
      reportMessage: reportMessage
    });
  },
  createReportItem(item) {
    "use strict";
    const id = item.get('id');
    const message = item.get('message');
    const activeItemStyle = cx('report_item', {
      active: this.state.selectItem === id
    });
    return (
      <div key={id} className="field">
        <div className={activeItemStyle} onClick={this.selectReportItem} data-id={id} data-message={message}>{message}</div>
      </div>
    )
  },
  sendReport() {
    "use strict";

    const {RemoveModalStore, LoginStore} = this.props;

    const isLogin = LoginStore.get('isLogin');
    if (isLogin) {
      const reportObj = {
        type: RemoveModalStore.get('type'),
        typeId: RemoveModalStore.get('typeId')
      };

      DeleteActions.delete(reportObj);
    }
  },
  render() {
    const { LoginStore, RemoveModalStore} = this.props;
    const loginFail = LoginStore.get('loginFail');
    const openReportModal = RemoveModalStore.get('openModal');
    const loginSuccess = LoginStore.get('loginSuccess');

    let content, title;
    if (openReportModal) {
      switch (RemoveModalStore.get('type')) {
        case 'post':
          content = this.props.Posts.get(RemoveModalStore.get('typeId').toString());
          title = ('제목 : ' + content.get('title')) || null;
          break;

        case 'comment':
          content = this.props.Comments.get(RemoveModalStore.get('typeId').toString());
          console.log(content);
          title = content ? <span>댓글: <div dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span> : null;
          break;

        case 'subComment':
          content = this.props.SubComments.get(RemoveModalStore.get('typeId').toString());
          title = content ? (<span>대댓글: <div dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span>) : null;
          break;

        default:
          content = null;
          title = null;
      }
    }

    const openModalStyle = cx('md-modal md-effect-1', {
      'md-show': openReportModal
    });

    return (
      <Modal
        overlayClassName={'report-modal md-overlay'}
        className={openModalStyle}
        isOpen={openReportModal}
        closeTimeoutMS={300}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
      >
        <div className="md-content content">
          <h4 className="ui header">
            글 삭제하기
            <div className="sub header">
              {title}
            </div>
          </h4>
          <div className="ui content">
            정말로 이 글을 삭제 하시겠습니까?
          </div>
          <div className="ui actions">
            <div className="ui primary approve button" onClick={this.sendReport}>확인</div>
          </div>
        </div>
      </Modal>
    );
  }
});

export default DeleteModalBox;