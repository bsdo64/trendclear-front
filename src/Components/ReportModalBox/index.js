import React from 'react';
import cx from 'classnames';
import ReportActions from '../../Actions/ReportActions.js';
import Modal from 'react-modal';

require('./index.scss');
const ReportModalBox = React.createClass({
  displayName: 'ReportModalBox',
  componentDidMount() {
    $('.md-content .ui.radio.checkbox').checkbox();
  },
  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {
      "use strict";
      $('.md-content .ui.radio.checkbox').checkbox('refresh');
    }, 0)
  },

  closeModal: function() {
    ReportActions.closeReportModal();
  },
  render() {
    const { LoginStore, ReportStore, Posts } = this.props;
    const loginFail = LoginStore.get('loginFail');
    const openReportModal = ReportStore.get('openReportModal');
    const loginSuccess = LoginStore.get('loginSuccess');

    const content = ReportStore.get('typeId') ? Posts.get(ReportStore.get('typeId').toString()) : null;

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
            불편하신 부분을 알려주세요.
            <div className="sub header">
              {content && ('제목 : ' + content.get('title'))}
            </div>
          </h4>
          <div className="ui content">
            <div className="ui form">
              <div className="grouped fields">
                <label htmlFor="report-item">어떤 부분이 불편하신가요? :</label>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="report-item" defaultChecked tabIndex="0" className="hidden" />
                    <label>불쾌하거나 흥미없는 내용입니다.</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="report-item" tabIndex="0" className="hidden" />
                    <label>스팸성 글입니다.</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="report-item" tabIndex="0" className="hidden" />
                    <label>인신공격, 불법, 허위 내용을 유포하고 있습니다.</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui actions">
            <div className="ui primary approve button">확인</div>
            <div className="ui cancel button">취소</div>
          </div>
        </div>
      </Modal>
    );
  }
});

export default ReportModalBox;
