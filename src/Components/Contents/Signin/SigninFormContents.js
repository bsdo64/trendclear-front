import React from 'react';
import { browserHistory } from 'react-router'

import SigninActions from '../../../Actions/SigninActions';

const SigninFormContents = React.createClass({
  getInitialState: function() {
    return {
      emailVerifyFormOpen: false
    }
  },
  componentWillReceiveProps(nextProps) {
    "use strict";
    const oldSubmitResult = this.props.SigninStore.toJS().subResult;
    const oldEmailVerifySuccess = this.props.SigninStore.toJS().emailVerifySuccess;
    const {submitResult, emailVerifySuccess} = nextProps.SigninStore.toJS();
    if (oldSubmitResult !== submitResult ) {
      if (oldEmailVerifySuccess !== emailVerifySuccess) {
        if (submitResult && emailVerifySuccess) {
          browserHistory.push('/');
        }
      }
    }
  },
  componentDidMount() {
    $('form select').dropdown();
    $(this.refs.signinform).form({
        inline : true,
        keyboardShortcuts: false,
        on: 'blur',
        fields: {
          email : {
            identifier  : 'signinEmail',
            rules: [
              {
                type   : 'empty',
                prompt : '이메일을 입력해주세요'
              },
              {
                type   : 'email',
                prompt : 'Email 형식을 입력해 주세요.'
              }
            ]
          },
          password: {
            identifier  : 'password',
            rules: [
              {
                type   : 'regExp[/^[a-z0-9_-]{4,16}$/]',
                prompt : 'Please enter a 4-16 letter username'
              }
            ]
          },
          password_re: {
            identifier  : 'password_re',
            rules: [
              {
                type   : 'match[password]',
                prompt : '입력한 비밀번호가 서로 다릅니다.'
              }
            ]
          },
          nick : {
            identifier  : 'signinNick',
            rules: [
              {
                type   : 'empty',
                prompt : '닉네임을 입력해주세요'
              },
              {
                type   : 'regExp[/^[a-z가-힣A-Z0-9_]+( [a-z가-힣A-Z0-9_]+)*$/]',
                prompt : '한칸 이상 공백은 허용하지 않습니다'
              }
            ]
          },
          sex: {
            identifier  : 'sex',
            rules: [
              {
                type   : 'minCount[1]',
                prompt : '성별을 선택해주세요'
              }
            ]
          },
          year: {
            identifier  : 'year',
            rules: [
              {
                type   : 'exactCount[1]',
                prompt : '태어난 연도를 선택해 주세요'
              }
            ]
          },
          month: {
            identifier  : 'month',
            rules: [
              {
                type   : 'exactCount[1]',
                prompt : '태어난 월을 선택해 주세요'
              }
            ]
          },
          day: {
            identifier  : 'day',
            rules: [
              {
                type   : 'exactCount[1]',
                prompt : '태어난 일을 선택해 주세요'
              }
            ]
          }
        },
        onSuccess: function(err, result) {
          result.birth = new Date(result.year, result.month - 1, result.day);
          SigninActions.submit(result);
        }
      });
  },
  handleEmail() {
    const emailValue = this.refs.signinEmail.value;
    if (emailValue.length > 3) {
      SigninActions.checkEmailDup({email: emailValue});
    }
  },
  handleNick() {
    const nickValue = this.refs.signinNick.value;
    if (nickValue.length > 1) {
      SigninActions.checkNickDup({nick: nickValue});
    }
  },
  handleSubmit() {
    const {emailDup, nickDup, emailVerifyFail ,emailVerifySuccess, emailRequested} = this.props.SigninStore.toJS();

    if (emailVerifyFail) {
      return;
    }

    if ((emailDup === false) && (nickDup === false) &&
        (emailVerifySuccess === false) && (emailVerifyFail === false) &&
        (!emailRequested)) {
      this.setState({emailVerifyFormOpen: true});
      this._sendEmailVerify();
    }

    if (!emailDup && !nickDup && !emailVerifyFail && emailVerifySuccess && emailRequested) {
      $(this.refs.signinform).form('validate form');
    }
  },
  _sendEmailVerify() {
    SigninActions.requestEmailVerify({
      email: this.refs.signinEmail.value
    });
  },
  handleCheckEmailVerify() {
    SigninActions.checkVerifyCode({verifyCode: this.refs.emailVerify.value});
  },
  render() {
    const {emailDup, nickDup, emailVerifyFail} = this.props.SigninStore.toJS();
    const {emailVerifyFormOpen} = this.state;

    let dupError = '';
    if (emailDup || nickDup || emailVerifyFail) {
      dupError = (
        <div className="ui error message" style={{display: 'block'}}>
          <ul className="list">
            {
              emailDup &&
              <li>이미 등록 되어 있는 이메일 입니다.</li>
            }
            {
              nickDup &&
              <li>이미 등록 되어 있는 닉네임 입니다.</li>
            }
            {
              emailVerifyFail &&
              <li>이메일 인증 코드가 일치하지 않습니다. 다시 확인해 주세요.</li>
            }
          </ul>
        </div>
      );
    }

    return (
      <div id="signinform_section" className="ui container section_pad">
        <h3 className="ui dividing header">
          회원 가입
          <div className="sub header">회원가입을 하시면 다양항 서비스를 이용하실 수 있습니다.</div>
        </h3>
        <form ref="signinform" className="ui form" name="fregister" id="fregister" >

          <div className="ui basic segment">
            <h4>로그인 정보</h4>
            <div className="field">
              <label>이메일</label>
              <input ref="signinEmail" type="text" name="signinEmail" placeholder="이메일을 입력하세요" onBlur={this.handleEmail} />
            </div>
            <div className="field">
              <label>비밀번호</label>
              <input type="password" name="password" placeholder="비밀번호를 입력하세요" />
            </div>
            <div className="field">
              <label>비밀번호 재입력</label>
              <input type="password" name="password_re" placeholder="비밀번호를 다시한번 입력하세요" />
            </div>
          </div>

          <div className="ui divider"></div>

          <div className="ui basic segment">
            <div className="field">
              <label>닉네임</label>
              <input ref="signinNick" type="text" name="signinNick" placeholder="닉네임을 입력하세요" onBlur={this.handleNick}/>
            </div>
            <div className="field">
              <label>성별</label>
              <select className="ui dropdown" name="sex">
                <option value="">성별</option>
                <option value="1">남자</option>
                <option value="0">여자</option>
              </select>
            </div>
            <div className="field">
              <label>생일</label>
              <div className="three fields">
                <div className="field">
                  <select className="ui fluid search dropdown" name="year">
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
                  <select className="ui fluid search dropdown" name="month">
                    <option value="">월</option>
                    <option value="1">1월</option>
                    <option value="2">2월</option>
                    <option value="3">3월</option>
                    <option value="4">4월</option>
                    <option value="5">5월</option>
                    <option value="6">6월</option>
                    <option value="7">7월</option>
                    <option value="8">8월</option>
                    <option value="9">9월</option>
                    <option value="10">10월</option>
                    <option value="11">11월</option>
                    <option value="12">12월</option>
                  </select>
                </div>
                <div className="field">
                  <select className="ui fluid search dropdown" name="day">
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

            {
              emailVerifyFormOpen &&
              <div className="field">
                <label>이메일 확인</label>
                <input ref="emailVerify" type="text" name="nick" placeholder="이메일을 확인해주세요" onBlur={this.handleCheckEmailVerify}/>
              </div>
            }
          </div>

          {dupError}

          <div className="ui basic segment">
            <div className="ui button primary fluid" onClick={this.handleSubmit}>가입하기</div>
          </div>
        </form>
      </div>
    );
  }
});

export default SigninFormContents;
