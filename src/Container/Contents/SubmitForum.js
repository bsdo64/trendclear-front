import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GnbStore from '../../Stores/GnbStore';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';

import ForumActions from '../../Actions/ForumActions';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const SubmitForm = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, LoginStore, UserStore];
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      UserStore: UserStore.getState(),
      LoginStore: LoginStore.getState()
    }
  }
}, React.createClass({
  componentDidMount() {
    $('.ui.form')
      .form({
        fields: {
          title: {
            identifier: 'forum_title',
            rules: [
              {
                type   : 'empty',
                prompt : '게시판 이름을 입력하세요'
              }
            ]
          },
          sub_header: {
            identifier: 'forum_sub_header',
          },
          description: {
            identifier: 'forum_description',
            rules: [
              {
                type   : 'empty',
                prompt : '게시판 설명을 입력하세요'
              }
            ]
          },
          rule: {
            identifier: 'forum_rule',
            rules: [
              {
                type   : 'empty',
                prompt : '게시판 규칙을 입력하세요'
              }
            ]
          }
        },
        onSuccess: (e, fields) => {
          e.preventDefault();
          e.stopPropagation();

          const formValue = {
            title: fields.forum_title,
            sub_header: fields.forum_sub_header,
            description: fields.forum_description,
            rule: fields.forum_rule
          };

          ForumActions.createForum(formValue);
        }
      });
  },

  render() {
    const { GnbStore } = this.props;
    const menus = GnbStore.get('gnbMenu');
    const nMenu = menus.getIn(['INCat', 'entities']);

    const forums = nMenu.get('forums');

    return (
      <div className="ui container" style={{margin: 10, width: 700}}>
        <div className={"ui segments "} >

          <div className={"ui segment"}>
            <h3 className="ui header">게시판 생성</h3>
            <div className="ui divider"></div>
            <div className="ui list">
              <a className="item">
                <i className="right triangle icon"></i>
                <div className="content">
                  <div className="header">사람들과 의견을 나누고 싶은 게시판을 생성하세요</div>
                  <div className="description">어떤 주제든 상관없습니다</div>
                </div>
              </a>
              <a className="item">
                <i className="help icon"></i>
                <div className="content">
                  <div className="description">게시판 이름은 중복이 허용되지 않습니다</div>
                </div>
              </a>
            </div>

            {/* 게시판 입력 폼 */}
            <form id="create_forum" className="ui form">
              <div className="field">
                <label>이름 *</label>
                <input name="forum_title" type="text" />
              </div>
              <div className="field">
                <label>부제 :</label>
                <input name="forum_sub_header" type="text" />
              </div>
              <div className="field">
                <label>설명 *</label>
                <input name="forum_description" type="text" />
              </div>
              <div className="field">
                <label>규칙 *</label>
                <textarea name="forum_rule" />
              </div>

              <div className="ui error message"></div>
              <div className={"ui submit button primary"}>확인</div>
            </form>
          </div>

        </div>
      </div>
    )
  }
}));

module.exports = SubmitForm;
