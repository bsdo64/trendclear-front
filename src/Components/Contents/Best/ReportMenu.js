import React from 'react';
import ReportActions from '../../../Actions/ReportActions';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import memoize from 'fast-memoize';

const Menu = (props) => {
  "use strict";

  function toggleModal (e) {
    "use strict";

    const action = e.target.dataset.action;
    const targetId = e.target.dataset.value;

    switch (action) {
      case 'report':
        console.log('포스트 신고 Id : ', targetId);
        const reportObj = {
          type: 'post',
          typeId: targetId
        };
        ReportActions.openReportModal(reportObj);
        break;
      case 'report_ad':

        console.log('포스트 광고 신고 Id : ', targetId);
        break;
      case 'delete_post':

        console.log('포스트 삭제 Id : ', targetId);
        break;
      default:
        break;
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className={"ui icon dropdown report_icon "}>
          <i className="warning outline icon"></i>
        </div>
      </DropdownTrigger>
      <DropdownContent>
        <div className="ui dropdown">
          <div className="ui menu transition visible" tabIndex="-1">
            <div className="item" data-value={props.postId} data-action="report" onClick={toggleModal}>신고</div>
            {
              props.isUser &&
              <div className="item " data-value={props.postId} data-action="delete_post" onClick={toggleModal}>삭제하기</div>
            }
          </div>
        </div>
      </DropdownContent>
    </Dropdown>
  )
};

export default memoize(Menu);