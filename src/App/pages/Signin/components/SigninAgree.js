import React, { PropTypes } from 'react';
import cx from 'classnames';
import Privacy from '../../../components/Contents/Policy/Privacy';
import Terms from '../../../components/Contents/Policy/Terms';

const SigninAgree = React.createClass({
  displayName: 'SigninAgree',
  propTypes: {
    FireToggleAgreePrivacy: PropTypes.func.isRequired,
    FireToggleAgreeTerm: PropTypes.func.isRequired,
    FireConfirmAgree: PropTypes.func.isRequired,
    FireResetSigninForm: PropTypes.func.isRequired,
    agreeTerm: PropTypes.bool.isRequired,
    agreePrivacy: PropTypes.bool.isRequired,
  },

  toggleTerm() {
    this.props.FireToggleAgreeTerm();
  },

  togglePrivacy() {
    this.props.FireToggleAgreePrivacy();
  },
  submitAgreement() {
    const {agreeTerm, agreePrivacy, FireConfirmAgree} = this.props;
    if (agreeTerm && agreePrivacy) {
      FireConfirmAgree();
    }
  },
  render() {
    const {agreeTerm, agreePrivacy} = this.props;

    const buttonClass = cx('btn_submit ui button submit primary fluid', {
      disabled: !agreeTerm || !agreePrivacy,
    });

    return (
      <div id="signin_section" className="section_pad">
        <h3 className="ui dividing header">
          회원 가입
          <div className="sub header">회원가입약관 및 개인정보처리방침안내의 내용에 동의하셔야 회원가입 하실 수
            있습니다.
          </div>
        </h3>
        <form className="ui form" name="fregister" id="fregister">
          <div className="ui basic segment">

            <section id="fregister_term">
              <h4>회원가입약관</h4>
              <div className="terms">
                <Terms inSigninForm={true} />
              </div>
              <div className="field agreements">
                <div className="ui checkbox">
                  <input id="term" type="checkbox"
                         name="term" checked={agreeTerm}
                         onClick={this.toggleTerm}/>
                  <label htmlFor="term">동의합니다.</label>
                </div>
              </div>
            </section>

            <section id="fregister_private">
              <h4>개인정보처리방침안내</h4>
              <div className="privacy">
                <Privacy inSigninForm={true} />
              </div>
              <div className="field agreements">
                <div className="ui checkbox">
                  <input id="private" type="checkbox"
                         name="private" checked={agreePrivacy}
                         onClick={this.togglePrivacy}/>
                  <label htmlFor="private">동의합니다.</label>
                </div>
              </div>
            </section>


            <div className="ui error message"></div>

            <div className="">
              <div className={buttonClass} onClick={this.submitAgreement}>다음
              </div>
            </div>

          </div>
        </form>
      </div>
    );
  },
});

export default SigninAgree;
