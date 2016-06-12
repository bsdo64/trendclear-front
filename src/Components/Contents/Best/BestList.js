import React from 'react';

import BestPost from './BestPost';
import ReportActions from '../../../Actions/ReportActions';

require('./BestList.scss');
const BestList = React.createClass({
  componentDidMount() {
    $('.ui.dropdown.report_icon')
      .dropdown({
        onChange: function(value, text, $selectedItem) {
          const action = $selectedItem.data('action');

          switch (action) {
            case 'report':

              console.log('포스트 신고 Id : ', value);
              ReportActions.openReportModal(true);
              break;
            case 'report_ad':

              console.log('포스트 광고 신고 Id : ', value);
              break;
            case 'delete_post':

              console.log('포스트 삭제 Id : ', value);
              break;
            default:
              break;
          }
        }
      });
  },

  componentDidUpdate() {
    "use strict";
    $('.ui.dropdown.report_icon')
      .dropdown({
        onChange: function(value, text, $selectedItem) {
          const action = $selectedItem.data('action');

          switch (action) {
            case 'report':

              console.log('포스트 신고 Id : ', value);
              ReportActions.openReportModal();
              break;
            case 'report_ad':

              console.log('포스트 광고 신고 Id : ', value);
              break;
            case 'delete_post':

              console.log('포스트 삭제 Id : ', value);
              break;
            default:
              break;
          }
        }
      });
  },

  componentWillUnmount() {
    $('.ui.dropdown.report_icon')
      .dropdown('destroy');
  },

  render() {
    const { posts, LoginStore, UserStore } = this.props;
    const postList = posts ? posts.get('postList') : undefined;
    const postArray = postList ? postList.get('result') : [];
    const createPostItem = function (itemId) {
      return <BestPost
        LoginStore={LoginStore}
        UserStore={UserStore}
        postList={postList}
        postId={itemId}
        key={itemId} styleClass="best_list_item"/>;
    };
    return (
      <div className="ui items best_list">
        {
          postArray.map(createPostItem)
        }
      </div>
    );
  }
});

export default BestList;