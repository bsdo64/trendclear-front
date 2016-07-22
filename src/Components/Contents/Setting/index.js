/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {Link} from 'react-router';
import UserActions from '../../../Actions/UserActions';
import SettingActions from '../../../Actions/SettingActions';

import moment from 'moment';

const SettingProfile = React.createClass({
  displayName: 'SettingProfile',
  getInitialState() {
    const {UserStore} = this.props;
    const sex = UserStore.getIn(['profile', 'sex']);
    const birthday = UserStore.getIn(['profile', 'birth']);

    const d = moment(birthday);
    return {
      sex: sex,
      year: d.get('year'),
      month: d.get('month'),
      date: d.get('date')
    };
  },

  componentDidMount() {
    $('.ui.radio.checkbox')
      .checkbox();

    $('select.dropdown')
      .dropdown();
  },

  changeYear(e) {
    "use strict";
    this.setState({year: e.target.value})
  },
  changeMonth(e) {
    "use strict";
    this.setState({month: e.target.value})
  },
  changeDate(e) {
    "use strict";
    this.setState({date: e.target.value})
  },
  changeSex(sex) {
    "use strict";
    this.setState({sex: sex})
  },

  updateProfile() {
    "use strict";
    const birth = {
      year: this.state.year,
      month: this.state.month,
      date: this.state.date
    };
    const profile = {
      sex: this.state.sex,
      birth: moment(birth).format()
    };

    console.log(profile);

    UserActions.updateProfile(profile);
  },

  closeMessageBox(type) {
    "use strict";

    $(this.refs[type + 'Message'])
      .closest('.message')
      .transition('fade');

    SettingActions.closeMessage({type: type});
  },

  setErrorMessage(SettingStore) {
    "use strict";
    const errMessage = SettingStore.get('error');
    const successMessage = SettingStore.get('success');

    if (errMessage) {
      return (
        <div ref="errorMessage" className="ui error message">
          <i className="close icon" onClick={this.closeMessageBox.bind(this, 'error')}></i>
          <ul className="list">
            <li>이전 비밀번호와 다릅니다.</li>
          </ul>
        </div>
      )
    }

    if (successMessage) {
      return (
        <div ref="successMessage" className="ui icon small success message">
          <i className="close icon" onClick={this.closeMessageBox.bind(this, 'success')}></i>
          <i className="checkmark icon"></i>
          <div className="content">
            <p>비밀번호를 성공적으로 변경하였습니다</p>
          </div>
        </div>
      )
    }

  },

  render() {
    "use strict";
    const {SettingStore} = this.props;
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
                  <div className="ui radio checkbox" onClick={this.changeSex.bind(this, true)}>
                    <input type="radio" name="sex" checked={this.state.sex}
                           className="hidden" value="1"
                    />
                    <label>남자</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox" onClick={this.changeSex.bind(this, false)}>
                    <input type="radio" name="sex" checked={!this.state.sex}
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
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                    <option value="1969">1969</option>
                    <option value="1968">1968</option>
                    <option value="1967">1967</option>
                    <option value="1966">1966</option>
                    <option value="1965">1965</option>
                    <option value="1964">1964</option>
                    <option value="1963">1963</option>
                    <option value="1962">1962</option>
                    <option value="1961">1961</option>
                    <option value="1960">1960</option>
                    <option value="1959">1959</option>
                    <option value="1958">1958</option>
                    <option value="1957">1957</option>
                    <option value="1956">1956</option>
                    <option value="1955">1955</option>
                    <option value="1954">1954</option>
                    <option value="1953">1953</option>
                    <option value="1952">1952</option>
                    <option value="1951">1951</option>
                    <option value="1950">1950</option>
                    <option value="1949">1949</option>
                    <option value="1948">1948</option>
                    <option value="1947">1947</option>
                    <option value="1946">1946</option>
                    <option value="1945">1945</option>
                    <option value="1944">1944</option>
                    <option value="1943">1943</option>
                    <option value="1942">1942</option>
                    <option value="1941">1941</option>
                    <option value="1940">1940</option>
                    <option value="1939">1939</option>
                    <option value="1938">1938</option>
                    <option value="1937">1937</option>
                    <option value="1936">1936</option>
                    <option value="1935">1935</option>
                    <option value="1934">1934</option>
                    <option value="1933">1933</option>
                    <option value="1932">1932</option>
                    <option value="1931">1931</option>
                    <option value="1930">1930</option>
                    <option value="1929">1929</option>
                    <option value="1928">1928</option>
                    <option value="1927">1927</option>
                    <option value="1926">1926</option>
                    <option value="1925">1925</option>
                    <option value="1924">1924</option>
                    <option value="1923">1923</option>
                    <option value="1922">1922</option>
                    <option value="1921">1921</option>
                    <option value="1920">1920</option>
                    <option value="1919">1919</option>
                    <option value="1918">1918</option>
                    <option value="1917">1917</option>
                    <option value="1916">1916</option>
                    <option value="1915">1915</option>
                    <option value="1914">1914</option>
                    <option value="1913">1913</option>
                    <option value="1912">1912</option>
                    <option value="1911">1911</option>
                    <option value="1910">1910</option>
                    <option value="1909">1909</option>
                    <option value="1908">1908</option>
                    <option value="1907">1907</option>
                    <option value="1906">1906</option>
                    <option value="1905">1905</option>
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
                    <option value="0">1월</option>
                    <option value="1">2월</option>
                    <option value="2">3월</option>
                    <option value="3">4월</option>
                    <option value="4">5월</option>
                    <option value="5">6월</option>
                    <option value="6">7월</option>
                    <option value="7">8월</option>
                    <option value="8">9월</option>
                    <option value="9">10월</option>
                    <option value="10">11월</option>
                    <option value="11">12월</option>
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
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="ui button primary" onClick={this.updateProfile}>저장</div>
          </form>

          {
            this.setErrorMessage(SettingStore)
          }
        </div>
      </div>
    )
  }
});

const SettingPassword = React.createClass({
  displayName: 'SettingPassword',
  componentDidMount() {
    $('.ui.form')
      .form({
        fields: {
          oldPassword : {
            identifier: 'old-password',
            rules: [
              {
                type   : 'empty',
                prompt : '빈칸을 모두 채워주세요'
              }
            ]
          },
          newPassword: {
            identifier: 'new-password',
            rules: [
              {
                type   : 'empty',
                prompt : '빈칸을 채워주세요'
              },

              {
                type   : 'minLength[6]',
                prompt : '적어도 {ruleValue}글자 이상 입력해주세요'
              }
            ]
          },
          reNewPassword: {
            identifier: 're-new-password',
            rules: [
              {
                type   : 'match[new-password]',
                prompt : '입력한 비밀번호와 서로 다릅니다.'
              }
            ]
          }
        },
        onSuccess: (e, value) => {
          e.preventDefault();

          UserActions.updatePassword({
            oldPassword: value['old-password'],
            newPassword: value['new-password']
          });
          console.log(value);
        },
        onFailure: () => {
          console.log('Fail');
        }
      })
    ;
  },

  closeMessageBox(type) {
    "use strict";

    $(this.refs[type + 'Message'])
      .closest('.message')
      .transition('fade');

    SettingActions.closeMessage({type: type});
  },

  setErrorMessage(SettingStore) {
    "use strict";
    const errMessage = SettingStore.get('error');
    const successMessage = SettingStore.get('success');

    if (errMessage) {
      return (
        <div ref="errorMessage" className="ui error message">
          <i className="close icon" onClick={this.closeMessageBox.bind(this, 'error')}></i>
          <ul className="list">
            <li>이전 비밀번호와 다릅니다.</li>
          </ul>
        </div>
      )
    }

    if (successMessage) {
      return (
        <div ref="successMessage" className="ui icon small success message">
          <i className="close icon" onClick={this.closeMessageBox.bind(this, 'success')}></i>
          <i className="checkmark icon"></i>
          <div className="content">
            <p>비밀번호를 성공적으로 변경하였습니다</p>
          </div>
        </div>
      )
    }

  },
  render() {
    const {SettingStore} = this.props;
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
              <input type="password" name="old-password" placeholder="예전 비밀번호" />
            </div>
            <div className="field">
              <label>새 비밀번호</label>
              <input type="password" name="new-password" placeholder="새로운 비밀번호" />
            </div>
            <div className="field">
              <label>새 비밀번호 확인</label>
              <input type="password" name="re-new-password" placeholder="새로운 비밀번호 확인" />
            </div>
            <div className="ui submit button primary">저장</div>
            <div className="ui error message "></div>
          </div>
          {
            this.setErrorMessage(SettingStore)
          }
        </div>
      </div>
    );
  }
});

if (process.env.browser === true) {
  require('./index.scss');
}
const SettingBox = React.createClass({
  displayName: 'SettingBox',
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render() {
    const {SettingStore} = this.props;
    switch (SettingStore.get('page')) {
      case 'password' :
        return <SettingPassword {...this.props} />;
      break;

      case 'profile' :
        return <SettingProfile {...this.props} />;
      break;

      default :
        return (<div></div>)
    }
  }
});

export default SettingBox;
