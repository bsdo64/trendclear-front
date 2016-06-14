import React from 'react';

import BestPost from './BestPost';
import ReportActions from '../../../Actions/ReportActions';

require('./BestList.scss');
const emptyArray = [];
const BestList = React.createClass({
  _onSelectOptionHandler(value, text, $selectedItem) {
    "use strict";

    const action = $selectedItem.data('action');

    switch (action) {
      case 'report':
        const { posts } = this.props;
        const postList = posts ? posts.get('postList') : undefined;
        const postObj = postList ? postList.get('entities'): {};

        const post = postObj.getIn(['posts', value.toString()]);

        console.log('포스트 신고 Id : ', value);
        const reportObj = {
          type: 'post',
          typeId: value,
          content: post
        };
        ReportActions.openReportModal(reportObj);
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
  },
  componentDidMount() {
    const self = this;

    $('.ui.dropdown.report_icon')
      .dropdown({
        onChange: self._onSelectOptionHandler
      });
  },

  componentDidUpdate() {
    "use strict";
    const self = this;

    $('.ui.dropdown.report_icon')
      .dropdown({
        onChange: self._onSelectOptionHandler
      });
  },

  componentWillUnmount() {
    $('.ui.dropdown.report_icon')
      .dropdown('destroy');
  },

  createPostItem(itemId) {
    const {LoginStore, UserStore, posts} = this.props;
    const postList = posts ? posts.get('postList') : undefined;
    return <BestPost
      LoginStore={LoginStore}
      UserStore={UserStore}
      postList={postList}
      postId={itemId}
      key={itemId} styleClass="best_list_item"/>;
  },

  render() {
    const { posts } = this.props;
    const postList = posts ? posts.get('postList') : undefined;
    const postArray = postList ? postList.get('result') : emptyArray;

    return (
      <div className="ui items best_list">
        {
          postArray.map(this.createPostItem)
        }
      </div>
    );
  }
});

export default BestList;