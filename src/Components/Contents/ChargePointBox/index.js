import React, {
  PropTypes,
} from 'react';
import Select from 'react-select';
import debug from 'debug';
const paymentLog = debug('vn:api:payment');

require('./index.scss');
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

        paymentLog(rsp);
      } else {
        let msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;

        paymentLog(rsp);
      }
    });
  },

  changeMethod({ value }) {
    this.setState({
      pay_method: value
    })
  },
  changeAmount({ value }) {
    this.setState({
      amount: value
    })
  },
  render() {
    return (
      <div className="rp_charge">
        <div className="ui segment">
          <h3>포인트 안내</h3>
          <p>베나클에서는 TP와 RP를 이용해서 좀 더 재미있고 창의적인 활동을 할 수 있도록 도와줍니다</p>

          <h3>TP</h3>
          <p>
            TP는 커뮤니티의 각종 활동에 의해서 적립되고 소모되는 포인트 입니다.<br />
            TP를 적립할 수 있는 활동으로 각 게시물을 만들거나 댓글에 참여 함으로써 적립할 수 있습니다.
          </p>
          <p>
            또한, 본인이 업로드한 글의 쉐어링크를 통해서 쉐어링크를 통해 들어온 순방문자당 5 포인트씩 실시간으로 적립됩니다.<br />
            그외에 포인트를 사용하여 아이템을 베나클의 각종 아이템을 구입 하실 수 있습니다.
          </p>

          <h3>RP</h3>
          <p>
            RP는 좀더 효과적으로 자신의 글을 웹상에 널리 알리기 위한 포인트 입니다.<br />
            RP를 사용하여 베나링크를 만들 수 있으며 이 베나링크는 자신의 글을 홍보하는데 사용되어지는 예산입니다.<br />
            RP는 실제 현금과 같은 가치가 있으며, 베나링크를 통해서 들어온 이용자당 5 포인트씩 소비되어 집니다.
          </p>
          <p>
            본인의 글을 직접 RP를 사용하여 홍보하기 위해서는 최소 1000P 이상의 RP 가 있어야 하며,<br />
            지정한 예산을 초과한 범위에서는 RP가 전혀 감소하지 않습니다.<br />
            또, 만약 베나링크 활성화에 사용한 RP가 모두 소진되지 않더라도 남은 RP는 본인의 계정으로 모두 재 적립 됩니다.<br /><br />

            RP를 적립하기 위한 방법으로 충전을 하거나 다른 사람의 베나링크에 참여하여 웹상에 공유하면,<br />
            그 베나링크를 타고 들어온 순방문자당 일정 포인트씩 적립이 됩니다.<br />
            베나링크 활성화가 끝나게 되면 적립된 RP를 지급 받으실 수 있습니다.
          </p>
        </div>

        <div className="ui segment">
          <h3>RP 충전하기</h3>
          <div className="rp_charge_form">
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
                { value: 100000, label: '100,000 원' }
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
        </div>
      </div>
    )
  }
});

export default ChargePointBox;
