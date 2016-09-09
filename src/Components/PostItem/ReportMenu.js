import React from 'react';
import {browserHistory} from 'react-router';
import ReportActions from '../../Actions/ReportActions';
import CommunityActions from '../../Actions/CommunityActions';
import DeleteActions from '../../Actions/DeleteActions';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import makeUrl from '../Lib/MakeUrl';
import memoize from 'fast-memoize';

import './ReportBox.scss';

function createToggleModal(props) {
  "use strict";

  const {forumId, targetId, targetType} = props;

  return function toggleModal (e) {
    "use strict";

    const action = e.target.dataset.action;
    const reportObj = {
      type: targetType,
      typeId: targetId
    };
    switch (action) {

      case 'report':
        console.log('포스트 신고 Id : ', targetId);
        ReportActions.openReportModal(reportObj);
        break;
      case 'report_ad':

        console.log('포스트 광고 신고 Id : ', targetId);
        break;
      case 'mod_post':
        console.log('포스트 수정 Id : ', targetId);
        browserHistory.push(`/community/submit?forumId=${forumId}&postId=${targetId}`)
        break;
      case 'mod_comment':
        console.log('댓글 수정 Id : ', targetId);
        CommunityActions.triggerUpdate({targetId, type:'comment'});
        break;
      case 'mod_subComment':
        console.log('대댓글 수정 Id : ', targetId);
        CommunityActions.triggerUpdate({targetId, type:'subComment'});
        break;
      case 'delete_post':
        DeleteActions.openModal(reportObj);
        console.log('포스트 삭제 Id : ', targetId);
        break;
      case 'delete_comment':
        DeleteActions.openModal(reportObj);
        console.log('댓글 삭제 Id : ', targetId);
        break;
      case 'delete_subComment':
        reportObj.type = 'sub_comment';

        DeleteActions.openModal(reportObj);
        console.log('대댓글 삭제 Id : ', targetId);
        break;
      default:
        break;
    }
  }
}


const Menu = (props) => {
  "use strict";

  const {isUser, targetType} = props;

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
            {
              !isUser &&
              <div className="item" data-action="report" onClick={createToggleModal(props)}>신고</div>
            }
            {
              isUser &&
              <div className="item " data-action={`mod_${targetType}`} onClick={createToggleModal(props)}>수정하기</div>
            }
            {
              isUser &&
              <div className="item " data-action={`delete_${targetType}`} onClick={createToggleModal(props)}>삭제하기</div>
            }
          </div>
        </div>
      </DropdownContent>
    </Dropdown>
  )
};

export default memoize(Menu);