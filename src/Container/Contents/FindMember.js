import React from 'react';
import {browserHistory} from 'react-router';

import connectToStores from 'alt-utils/lib/connectToStores';
import UserActions from '../../Actions/UserActions';
import ResetPasswordStore from '../../Stores/UI/ResetPasswordStore';
import AuthStore from '../../Stores/UI/AuthStore';

const FindMemberContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      ResetPasswordStore,
      AuthStore
    ]
  },

  getPropsFromStores() {
    return {
      ResetPasswordStore: ResetPasswordStore.getState(),
      AuthStore: AuthStore.getState()
    }
  }
}, React.createClass({
  getInitialState() {
    return {
      error: null,
      requestFindEmail: null,
      userExist: null,
      resetEmailSent: null
    };
  },

  componentDidMount() {
    $('.ui.form')
      .form({
        inline: true,
        on: 'blur',
        fields: {
          name: {
            identifier: 'email',
            rules: [
              {
                type   : 'empty',
                prompt : '이메일을 입력해주세요'
              },
              {
                type   : 'email',
                prompt : '이메일을 입력해주세요'
              },
            ]
          }
        },
        onSuccess: (e, fields) => {
          e.preventDefault();
          e.stopPropagation();

          UserActions.loadRequestResetPassword({
            email: fields.email
          });
        }
      });
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.form').form('refresh');
  },

  componentWillMount() {
    const {AuthStore} = this.props;
    if (AuthStore.get('isLogin')) {
      browserHistory.push('/setting/password');
    }
  },


  render() {
    const {ResetPasswordStore} = this.props;
    const error = ResetPasswordStore.get('error');
    const emailSent = ResetPasswordStore.get('resetEmailSent');
    const isLoading = ResetPasswordStore.get('isLoading');

    let validateError;
    if (error) {
      validateError = (
        <div className="ui error message" style={{display: 'block'}}>
          <ul className="list">
            <li>사용자가 존재하지 않습니다</li>
          </ul>
        </div>
      );
    }

    return (
      <div style={{paddingTop: 50}}>
        <div className="ui segments" style={{width: 300, margin: '0 auto'}}>
          <div className="ui segment">
            <h2 className="ui center aligned icon header">
              <i className="circular history icon"></i>
              비밀번호 재설정
            </h2>
            <p>가입한 이메일을 입력하면 비밀번호 재설정을 위한 안내를 보내드립니다</p>
          </div>

          <div className="ui form segment ">
            <div className="field" style={{width: '100%', paddingBottom: 10}}>
              <input type="text" name="email" placeholder="가입하신 Email" />
            </div>

            {validateError}

            {
              isLoading &&
              <div className="ui icon message">
                <i className="notched circle loading icon"></i>
                <div className="content">
                  <div className="header">
                    확인 중입니다
                  </div>
                  <p>잠시만 기다려주세요</p>
                </div>
              </div>
            }

            {
              emailSent && !isLoading &&
              <div className="ui positive message">
                <div className="header">
                  이메일이 전송되었습니다!
                </div>
                <p>지금 이메일을 확인해 주세요!</p>
              </div>
            }

            {
              !emailSent && !isLoading &&
              <div className="ui submit button fluid primary">이메일 확인하기</div>
            }
          </div>
        </div>
      </div>
    )
  }
}));

module.exports = FindMemberContainer;
