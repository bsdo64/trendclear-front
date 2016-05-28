import React from 'react';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';
import _ from 'lodash';
import GnbActions from '../../Actions/GnbActions';
import Modal from 'react-modal';

require('./index.scss');
const Temp = React.createClass({
  getInitialState() {
    return {
      openFilter: false,
      modalIsOpen: false
    };
  },

  componentWillReceiveProps(nextProps) {
    
  },
  
  updateFilterValue(club, selectArray, event) {
    "use strict";

    GnbActions.updateFilter({[club]: selectArray});
  },

  toggleFilter() {
    "use strict";

    this.setState({openFilter: !this.state.openFilter});
  },


  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    $(this.refs.loginform)
      .form({
        inline : true,
        on     : 'blur',
        keyboardShortcuts: false,
        fields: {
          loginEmail     : {
            identifier  : 'loginEmail',
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
          password   : {
            identifier  : 'password',
            rules: [
              {
                type   : 'regExp[/^[a-z0-9_-]{4,16}$/]',
                prompt : '비밀번호는 4~16자리,영문 입니다'
              }
            ]
          }
        },
        onSuccess: function(event, fields) {
          LoginActions.sendLogin({
            email: fields.loginEmail,
            password: fields.password
          });
        },
        onFailure: function (formErrors, fields) {
          console.log(formErrors);
          console.log(fields);
        }
      });
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render() {
    "use strict";

    const {GnbStore} = this.props;
    const INCat = GnbStore.getIn(['gnbMenu', 'INCat']);
    const clubs = INCat ? INCat.getIn(['entities', 'clubs']).toJS(): {};
    const categoryGroups = INCat ? INCat.getIn(['entities', 'categoryGroups']).toJS(): {};
    const categories = INCat ? INCat.getIn(['entities', 'categories']).toJS(): {};

    const clubMap = _.map(clubs, (value, key) => {
      return {value: key, label: value.title};
    });
    const categoryGroupsMap = _.map(categoryGroups, (value, key) => {
      return {value: key, label: value.title};
    });
    const categoriesMap = _.map(categories, (value, key) => {
      return {value: key, label: value.title};
    });

    const clubValue = GnbStore.get('clubValue') ? GnbStore.get('clubValue').toJS() : [];
    const categoryGroupValue = GnbStore.get('categoryGroupValue') ? GnbStore.get('categoryGroupValue').toJS() : [];
    const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];


    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'베스트'}</div>
          </div>
        </div>
        <menu id="best_filter" className="sub_category_list">

          <div className="sub_category_header">{'전체보기'}</div>
          <button onClick={this.openModal}>Open Modal</button>

          <Modal
            overlayClassName={'ui dimmer modals page transition visible active ' + (this.state.modalIsOpen ? '' : 'fade out')}
            className="ui small modal gb_login scrolling transition visible active "
            isOpen={this.state.modalIsOpen}
            closeTimeoutMS={500}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            >

              <i className="close icon"></i>
              <div className="content">

                <div id="tc_Head" role="banner">
                  <h1>
                    <a href="/" id="tc_ServiceLogo"><span
                      className="ir_wa">Trend Clear</span></a>
                  </h1>
                </div>

                <div id="tc_Content" role="main">
                  <div id="mArticle">
                    <form className="ui form" ref="loginform">
                      <div className="field">
                        <label>이메일</label>
                        <input type="text" name="loginEmail"  />
                      </div>
                      <div className="field">
                        <label>비밀번호</label>
                        <input type="password" name="password" />
                      </div>
                      <div className="inline field">
                        <div className="ui checkbox">
                          <input type="checkbox" id="agreement-checkbox" />
                          <label htmlFor="agreement-checkbox">아이디를 저장합니다</label>
                        </div>
                      </div>
                      <div className="ui primary button fluid" onClick={this.handleRequestLogin}>로그인</div>


                      <div className="login_append">
                        <a href="/member/find/loginId" className="link_find">아이디</a>
                        <span> / </span>
                        <a href="/member/find/password" className="link_find">비밀번호찾기</a>
                        <span className="txt_bar">|</span>
                        <Link to="/signin" onClick={this.handleRequestSignin}>회원 가입하기</Link>
                      </div>

                    </form>
                  </div>
                  <div id="tc_Foot" className="footer_tistory" role="contentinfo">
                    <div className="inner_footer">
                      <address className="txt_copyright">
                        Copyright ©
                        <a className="link_tc_">TrendClear Corp.</a>
                        All rights reserved.
                      </address>
                    </div>
                  </div>
                </div>
              </div>
          </Modal>

          <ul >
            <li>
              <h5 className="">
                <a onClick={this.toggleFilter}>{'필터링'}</a>
              </h5>

              {
                this.state.openFilter &&
                [
                  <div key={'club'} className="sub_category item">
                    <a>{'클럽'}</a>
                    <Select
                      multi={true}
                      placeholder="클럽 선택 .."
                      value={clubValue}
                      options={clubMap}
                      onChange={this.updateFilterValue.bind(this, 'clubValue')}
                    />
                  </div>
                  ,
                  <div key={'category_group'} className="sub_category item">
                    <a>{'카테고리 그룹'}</a>
                    <Select
                      multi={true}
                      placeholder="그룹 선택 .."
                      value={categoryGroupValue}
                      options={categoryGroupsMap}
                      onChange={this.updateFilterValue.bind(this, 'categoryGroupValue')}
                    />
                  </div>
                  ,
                  <div key={'category'} className="sub_category item">
                    <a >{'카테고리'}</a>
                    <Select
                      multi={true}
                      placeholder="카테고리 선택 .."
                      value={categoryValue}
                      options={categoriesMap}
                      onChange={this.updateFilterValue.bind(this, 'categoryValue')}
                    />
                  </div>
                ]
              }
            </li>
          </ul>
        </menu>
    </div>
  }
})

export default Temp ;