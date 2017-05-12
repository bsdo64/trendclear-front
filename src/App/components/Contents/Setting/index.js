import React from 'react';
import PropTypes from 'prop-types';
import moment from '../../../Lib/MomentLib';
import debug from 'debug';
const logger = debug('vn:front:error');

class SettingProfile extends React.Component {
  constructor(props) {
    super(props);

    const { UserStore } = this.props;
    const sex = UserStore.getIn(['profile', 'sex']);
    const birthday = UserStore.getIn(['profile', 'birth']);

    const d = moment(birthday);
    this.state = {
      sex: sex,
      year: d.get('year'),
      month: d.get('month'),
      date: d.get('date'),
    };

    this.successMessage = null;
    this.errorMessage = null;

    this.createYear = this.createYear.bind(this);
    this.createMonth = this.createMonth.bind(this);
    this.createDate = this.createDate.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeSex = this.changeSex.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.closeMessageBox = this.closeMessageBox.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
  }

  componentDidMount() {
    $('.ui.radio.checkbox')
      .checkbox();

    $('select.dropdown')
      .dropdown();
  }

  createYear() {

    const list = [];
    for (let i = 0; i < 100; i++) {
      const value = this.props.defaultYear - i;
      list.push(<option key={value} value={value}>{value}</option>);
    }

    return list;
  }

  createMonth() {

    const list = [];
    const month = this.props.defaultMonth;
    for (let i = 0; i < month; i++) {
      list.push(<option key={i} value={i}>{`${i + 1} 월`}</option>);
    }

    return list;
  }

  createDate() {
    const list = [];
    const month = 31;
    for (let i = 0; i < month; i++) {
      list.push(<option key={i} value={i}>{`${i + 1} 일`}</option>);
    }

    return list;
  }

  changeYear(e) {
    this.setState({ year: e.target.value });
  }

  changeMonth(e) {
    this.setState({ month: e.target.value });
  }

  changeDate(e) {
    this.setState({ date: e.target.value });
  }

  changeSex(sex) {
    this.setState({ sex: sex });
  }

  updateProfile() {
    const birth = {
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,
    };
    const profile = {
      sex: this.state.sex,
      birth: moment(birth).format(),
    };

    this.props.FireRequestUserUpdateProfile(profile);
  }

  closeMessageBox(successType) {

    $(this[successType + 'Message'])
      .closest('.message')
      .transition('fade');

    this.props.FireCloseUserSettingMessage({ successType });
  }

  setErrorMessage(UserSettingStore) {
    const errMessage = UserSettingStore.get('error');
    const successMessage = UserSettingStore.get('success');

    if (errMessage) {
      return (
        <div ref={r => this.errorMessage = r} className="ui error message">
          <i className="close icon"
             onClick={this.closeMessageBox.bind(this, 'error')}/>
          <ul className="list">
            <li>이전 비밀번호와 다릅니다.</li>
          </ul>
        </div>
      );
    }

    if (successMessage) {
      return (
        <div ref={r => this.successMessage = r} className="ui icon small success message">
          <i className="close icon"
             onClick={this.closeMessageBox.bind(this, 'success')}/>
          <i className="checkmark icon"/>
          <div className="content">
            <p>비밀번호를 성공적으로 변경하였습니다</p>
          </div>
        </div>
      );
    }
  }

  render() {
    const { UserSettingStore } = this.props;
    return (
      <div id="setting">
        <h3 className="ui dividing header">
          회원 정보
          <div className="ui sub header">회원 정보를 수정합니다.</div>
        </h3>

        <div className="setting-account">
          <form className="ui form ">
            <div className="three fields">
              <div className="grouped fields">
                <label htmlFor="fruit">성별</label>
                <div className="field">
                  <div className="ui radio checkbox"
                       onClick={this.changeSex.bind(this, true)}>
                    <input type="radio" name="sex"
                           defaultChecked={this.state.sex}
                           className="hidden" value="1"
                    />
                    <label>남자</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox"
                       onClick={this.changeSex.bind(this, false)}>
                    <input type="radio" name="sex"
                           defaultChecked={!this.state.sex}
                           className="hidden" value="0"
                    />
                    <label>여자</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>생일</label>
              <div className="three fields">
                <div className="field">
                  <select
                    className="ui fluid search dropdown"
                    name="year"
                    value={this.state.year}
                    onChange={this.changeYear}
                  >
                    <option value="">연도</option>
                    {
                      this.createYear()
                    }
                  </select>
                </div>
                <div className="field">
                  <select
                    className="ui fluid search dropdown"
                    name="month"
                    value={this.state.month}
                    onChange={this.changeMonth}
                  >
                    <option value="">월</option>
                    {
                      this.createMonth()
                    }
                  </select>
                </div>
                <div className="field">
                  <select
                    className="ui fluid search dropdown"
                    name="day"
                    value={this.state.date}
                    onChange={this.changeDate}
                  >
                    <option value="">일</option>
                    {
                      this.createDate()
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className="ui button primary" onClick={this.updateProfile}>저장
            </div>
          </form>

          {
            this.setErrorMessage(UserSettingStore)
          }
        </div>
      </div>
    );
  }
}

SettingProfile.defaultProps = {
  defaultYear: new Date().getYear() + 1900,
  defaultMonth: 12,
  defaultDate: 31,
};
SettingProfile.displayName = 'SettingProfile';
SettingProfile.propTypes = {
  UserStore: PropTypes.object.isRequired,
  defaultYear: PropTypes.number.isRequired,
  defaultMonth: PropTypes.number.isRequired,
  UserSettingStore: PropTypes.object.isRequired,
  FireCloseUserSettingMessage: PropTypes.func.isRequired,
  FireRequestUserUpdateProfile: PropTypes.func.isRequired,
};

class SettingPassword extends React.Component {
  constructor(props) {
    super(props);

    this.successMessage = null;
    this.errorMessage = null;

    this.closeMessageBox = this.closeMessageBox.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
  }

  componentDidMount() {
    $('.ui.form')
      .form({
        fields: {
          oldPassword: {
            identifier: 'old-password',
            rules: [
              {
                type: 'empty',
                prompt: '빈칸을 모두 채워주세요',
              },
            ],
          },
          newPassword: {
            identifier: 'new-password',
            rules: [
              {
                type: 'empty',
                prompt: '빈칸을 채워주세요',
              },

              {
                type: 'minLength[6]',
                prompt: '적어도 {ruleValue}글자 이상 입력해주세요',
              },
            ],
          },
          reNewPassword: {
            identifier: 're-new-password',
            rules: [
              {
                type: 'match[new-password]',
                prompt: '입력한 비밀번호와 서로 다릅니다.',
              },
            ],
          },
        },
        onSuccess: (e, value) => {
          e.preventDefault();

          this.props.FireRequestUserUpdatePassword({
            oldPassword: value['old-password'],
            newPassword: value['new-password'],
          });

        },
        onFailure: (e) => {
          logger('Form validate fail', e);
        },
      })
    ;
  }

  closeMessageBox(successType) {

    $(this[successType + 'Message'])
      .closest('.message')
      .transition('fade');

    this.props.FireCloseUserSettingMessage({ successType });
  }

  setErrorMessage(UserSettingStore) {
    const errMessage = UserSettingStore.get('error');
    const successMessage = UserSettingStore.get('success');

    if (errMessage) {
      return (
        <div ref={r => this.errorMessage = r} className="ui error message">
          <i className="close icon"
             onClick={this.closeMessageBox.bind(this, 'error')}/>
          <ul className="list">
            <li>이전 비밀번호와 다릅니다.</li>
          </ul>
        </div>
      );
    }

    if (successMessage) {
      return (
        <div ref={r => this.successMessage = r} className="ui icon small success message">
          <i className="close icon"
             onClick={this.closeMessageBox.bind(this, 'success')}/>
          <i className="checkmark icon"/>
          <div className="content">
            <p>비밀번호를 성공적으로 변경하였습니다</p>
          </div>
        </div>
      );
    }
  }

  render() {
    const { UserSettingStore } = this.props;
    return (
      <div id="setting">

        <h3 className="ui dividing header">
          비밀번호 설정
          <div className="ui sub header">새로운 비밀번호를 설정합니다.</div>
        </h3>

        <div className="setting-account">
          <div className="ui form ">
            <div className="field">
              <label>이전 비밀번호</label>
              <input type="password" name="old-password" placeholder="예전 비밀번호"/>
            </div>
            <div className="field">
              <label>새 비밀번호</label>
              <input type="password" name="new-password"
                     placeholder="새로운 비밀번호"/>
            </div>
            <div className="field">
              <label>새 비밀번호 확인</label>
              <input type="password" name="re-new-password"
                     placeholder="새로운 비밀번호 확인"/>
            </div>
            <div className="ui submit button primary">저장</div>
            <div className="ui error message "/>
          </div>
          {
            this.setErrorMessage(UserSettingStore)
          }
        </div>
      </div>
    );
  }
}

SettingPassword.displayName = 'SettingPassword';
SettingPassword.propTypes = {
  UserSettingStore: PropTypes.object.isRequired,
  FireCloseUserSettingMessage: PropTypes.func.isRequired,
  FireRequestUserUpdatePassword: PropTypes.func.isRequired,
};

require('./index.scss');
const SettingBox = props => {
  const { UserSettingStore } = props;
  switch (UserSettingStore.get('page')) {
    case 'password' :
      return <SettingPassword {...props} />;

    case 'profile' :
      return <SettingProfile {...props} />;

    default :
      return (<div/>);
  }
};

SettingBox.displayName = 'SettingBox';
SettingBox.propTypes = {
  UserSettingStore: PropTypes.object.isRequired,
  FireCloseUserSettingMessage: PropTypes.func.isRequired,
  FireRequestUserUpdatePassword: PropTypes.func.isRequired,
  FireRequestUserUpdateProfile: PropTypes.func.isRequired,
};

export default SettingBox;
