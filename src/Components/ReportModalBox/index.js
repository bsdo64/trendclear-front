import React from 'react';
import cx from 'classnames';
import ReportActions from '../../Actions/ReportActions.js';
import Modal from 'react-modal';

require('./index.scss');
const ReportModalBox = React.createClass({
  displayName: 'ReportModalBox',
  
  getInitialState() {
    return {
      selectItem: 1
    }
  },

  closeModal: function() {
    ReportActions.closeReportModal();
  },
  selectReportItem(e) {
    "use strict";

    const reportId = e.target.dataset.id;
    this.setState({selectItem: parseInt(reportId, 10)});
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
        <div className={activeItemStyle} onClick={this.selectReportItem} data-id={id}>{message}</div>
      </div>
    )
  },
  sendReport() {
    "use strict";

    const {ReportStore} = this.props;

    const reportObj = {
      type: ReportStore.get('type'),
      typeId: ReportStore.get('typeId'),
      reportId: this.state.selectItem
    };

    ReportActions.sendReport(reportObj);
  },
  render() {
    const { LoginStore, ReportStore} = this.props;
    const loginFail = LoginStore.get('loginFail');
    const openReportModal = ReportStore.get('openReportModal');
    const loginSuccess = LoginStore.get('loginSuccess');


    let content, title;
    switch (ReportStore.get('type')) {
      case 'post':
        content = this.props.Posts.get(ReportStore.get('typeId').toString());
        title = ('제목 : ' + content.get('title')) || null;
        break;

      case 'comment':
        content = this.props.Comments.get(ReportStore.get('typeId').toString());
        console.log(content);
        title = content ? <span>댓글: <div dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span> : null;
        break;

      case 'subComment':
        content = this.props.SubComments.get(ReportStore.get('typeId').toString());
        title = content ? (<span>대댓글: <div dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span>) : null;
        break;

      default:
        content = null;
        title = null;
    }

    const reportSuccess = ReportStore.get('successReport');

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
        {
          !reportSuccess &&
          <div className="md-content content">
            <h4 className="ui header">
              불편하신 부분을 알려주세요.
              <div className="sub header">
                {title}
              </div>
            </h4>
            <div className="ui content">
              <div className="ui form">
                <div className="grouped fields">
                  <label htmlFor="report-item">어떤 부분이 불편하신가요? :</label>
                  {
                    ReportStore.get('reportItem').map(this.createReportItem)
                  }
                </div>
              </div>
            </div>
            <div className="ui actions">
              <div className="ui primary approve button" onClick={this.sendReport}>확인</div>
            </div>
          </div>
        }

        {
          reportSuccess &&
          <div className="md-content content">
            <div className="success">
              <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              <h2 className="ui icon header">
                <div className="content">
                  신고 되었습니다.
                  <div className="sub header">의견을 보내주셔서 감사합니다.</div>
                </div>
              </h2>
            </div>
          </div>
        }
      </Modal>
    );
  }
});

export default ReportModalBox;