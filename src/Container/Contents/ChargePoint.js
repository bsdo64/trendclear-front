import React, { PropTypes } from 'react';
import { getLoginUser } from '../Util/func';
import { connect } from 'react-redux';
import Select from 'react-select';

const ChargePointBox = React.createClass({
  displayName: 'ChargePointBox',
  propTypes: {
    UserStore: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      pay_method: 'trans',
      amount: 10000
    };
  },

  sendPayment() {
    const { UserStore } = this.props;

    const IMP = window.IMP;
    IMP.init('imp27018207');

    IMP.request_pay({
      pg: 'html5_inicis', // version 1.1.0부터 지원.
      /*
       'kakao':카카오페이,
       'inicis':이니시스, 'html5_inicis':이니시스(웹표준결제),
       'nice':나이스,
       'jtnet':jtnet,
       'uplus':LG유플러스
       */
      pay_method: this.state.pay_method, // 'card' : 신용카드 | 'trans' : 실시간계좌이체 | 'vbank' : 가상계좌 | 'phone' : 휴대폰소액결제
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: 'RP 충전',
      amount: this.state.amount,
      buyer_email: UserStore.get('email'),
      buyer_name: UserStore.get('nick')
    }, function (rsp) {
      if (rsp.success) {
        let msg = '결제가 완료되었습니다.';
        msg += '고유ID : ' + rsp.imp_uid;
        msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        msg += '카드 승인번호 : ' + rsp.apply_num;

        console.log(msg);
      } else {
        let msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;

        console.log(msg);
      }
    });
  },

  changeMethod({ value, label }) {
    this.setState({
      pay_method: value
    })
  },
  changeAmount({ value, label }) {
    this.setState({
      amount: value
    })
  },
  render() {
    return (
      <div className="ui container segment">
        <h3>1. 충전 방법 선택</h3>
        <Select
          options={[
            { value: 'vbank', label: '가상계좌' },
            { value: 'card', label: '신용카드' },
            { value: 'trans', label: '실시간계좌이체' },
            { value: 'phone', label: '휴대폰소액결제' },
          ]}
          value={this.state.pay_method}
          name="select-method"
          onChange={this.changeMethod}
          clearable={false}
        />
        <h3>2. 충전 금액</h3>
        <Select
          options={[
            { value: 10000, label: '10,000 원' },
            { value: 30000, label: '30,000 원' },
            { value: 50000, label: '50,000 원' },
            { value: 100000, label: '100,000 원' },
            { value: 300000, label: '300,000 원' },
            { value: 500000, label: '500,000 원' },
            { value: 1000000, label: '1,000,000 원' },
          ]}
          value={this.state.amount}
          name="select-amount"
          onChange={this.changeAmount}
          clearable={false}
        />
        <h3>충전 내역</h3>
        <div style={{ textAlign: 'right' }}>
          내역 (예산 : {this.state.amount}원 + VAT:{parseInt(this.state.amount * 0.1, 10)}원)
          <br />
          총 충전 금액 : {parseInt(this.state.amount * 1.1, 10)}원
        </div>
        <div style={{ paddingTop: 10 }}>
          <div className="ui button primary right fluid" onClick={this.sendPayment}>충전하기</div>
        </div>
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    GnbStore: getUIState('Gnb'),
    LoginStore: getUIState('Login'),
    CommunityStore: getUIState('Community'),
    SearchStore: getUIState('Search'),
    ListStore: getUIState('List'),
    PaginationStore: getUIState('Pagination'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Users: getDomainState('Users'),
  }
};

module.exports = connect(
  mapStateToProps,
  {

  }
)(ChargePointBox);
