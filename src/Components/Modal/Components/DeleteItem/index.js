import React from 'react';
import DeleteActions from '../../../../Actions/DeleteActions';

require('./index.scss');
const DeleteModalBox = React.createClass({
  displayName: 'DeleteModalBox',
  propTypes: {
    RemoveModalStore: React.PropTypes.object.isRequired,
    LoginStore: React.PropTypes.object.isRequired,
    Posts: React.PropTypes.object.isRequired,
    Comments: React.PropTypes.object.isRequired,
    SubComments: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      selectItem: 1
    }
  },
  sendReport() {
    "use strict";

    const { RemoveModalStore, LoginStore } = this.props;

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
    const { RemoveModalStore } = this.props;

    let content, title;
    switch (RemoveModalStore.get('type')) {
      case 'post':
        content = this.props.Posts.get(RemoveModalStore.get('typeId').toString());
        title = ('제목 : ' + content.get('title')) || null;
        break;

      case 'comment':
        content = this.props.Comments.get(RemoveModalStore.get('typeId').toString());
        title = content ? <span>댓글: <div
          dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span> : null;
        break;

      case 'subComment':
        content = this.props.SubComments.get(RemoveModalStore.get('typeId').toString());
        title = content ? (<span>대댓글: <div
          dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span>) : null;
        break;

      default:
        content = null;
        title = null;
    }

    return (
      <div className="delete-modal">
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
      </div>
    );
  }
});

export default DeleteModalBox;