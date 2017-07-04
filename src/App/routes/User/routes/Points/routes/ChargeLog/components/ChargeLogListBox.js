import React from 'react';
import PropTypes from 'prop-types';
import accounting from 'accounting';
import ReactToolTip from 'react-tooltip';
import moment from '../../../../../../../Lib/MomentLib';
import TablePagination from '../../../../../../../components/Paginator/TablePagination';

class ChargeLogListBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };

    this.paymentTime = this.paymentTime.bind(this);
    this.paymentStatus = this.paymentStatus.bind(this);
    this.paymentMethod = this.paymentMethod.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.getVbankInfo = this.getVbankInfo.bind(this);
  }

  componentDidUpdate() {
    ReactToolTip.rebuild();
  }

  componentWillUnmount() {
    ReactToolTip.rebuild();
  }

  paymentTime(payment) {
    const momentTime = moment(payment.get('paid_at'));
    const unixTime = momentTime.unix();

    let time;
    switch (unixTime) {
      case 0: {
        time = '';
        break;
      }

      default: {
        time = momentTime.format('YYYY/MM/DD HH:mm');
      }
    }

    return time;
  }

  paymentStatus(payment) {
    const status = payment.get('status');

    let paymentStatus;
    switch (status) {
      case 'paid': {
        paymentStatus = '결제 완료';
        break;
      }

      case 'ready': {
        paymentStatus = '입금 대기중 ..';
        break;
      }

      case 'cancelled': {
        paymentStatus = '결제 취소';
        break;
      }

      case 'failed': {
        paymentStatus = '결제 실패';
        break;
      }

      default: {
        paymentStatus = '';
      }
    }

    return paymentStatus;
  }

  paymentMethod(payment) {
    const method = payment.get('pay_method');

    let paymentMethod;
    switch (method) {
      case 'trans': {
        paymentMethod = '계좌이체';
        break;
      }

      case 'card': {
        paymentMethod = '신용카드';
        break;
      }

      case 'vbank': {
        paymentMethod = (
          <div data-tip data-for='vbankinfo' onMouseEnter={this.getVbankInfo(payment)}>
            <a  >가상계좌</a>
          </div>
        );
        break;
      }

      default: {
        paymentMethod = '';
      }
    }

    return paymentMethod;
  }

  handlePage(p) {
    return () => {
      this.props.FireRequestGetMoreChargeLogList({
        p: p,
      });

      this.setState({
        page: p,
      });
    };
  }

  getVbankInfo(payment) {
    const { FireGetVbankInfo } = this.props;

    return () => {
      FireGetVbankInfo({ paymentId: payment.get('id') });
    }
  }

  render() {
    const {UserStore} = this.props;
    const payments = UserStore.getIn(['payments', 'results']);
    const paymentTotal = UserStore.getIn(['payments', 'total']);
    const pageLimit = 20;
    const totalPage = Math.ceil(paymentTotal / pageLimit);

    if (!payments) {
      return <div />;
    }

    return (
      <div style={{padding: 10, fontSize: 12}}>
        <h4>RP 충전 내역</h4>
        <table className="ui celled padded table">
          <thead>
          <tr>
            <th className="single line">주문 ID</th>
            <th>주문 RP</th>
            <th>주문 내역</th>
            <th>결제 가격</th>
            <th>결제 시간</th>
            <th>결제 수단</th>
            <th>상태</th>
          </tr>
          </thead>
          <tbody>
          {
            payments.map(payment => {
              return (
                <tr key={payment.get('id')}>
                  <td>
                    {payment.get('merchant_uid')}
                  </td>
                  <td className="single line">
                    {
                      accounting.formatNumber(payment.get('amount') * 10 / 11)
                    } RP
                  </td>
                  <td>
                    {payment.get('name')}
                  </td>
                  <td className="right aligned">
                    {
                      accounting.formatNumber(payment.get('amount'))
                    } 원
                  </td>
                  <td className="right aligned">
                    {
                      this.paymentTime(payment)
                    }
                  </td>
                  <td>
                    {
                      this.paymentMethod(payment)
                    }
                  </td>
                  <td className="right aligned">
                    {
                      this.paymentStatus(payment)
                    }
                  </td>
                </tr>
              );
            })
          }
          </tbody>
          <tfoot>
          <tr>
            <th colSpan="7">
              <TablePagination
                totalPage={totalPage}
                currentPage={this.state.page}
                pageLimit={pageLimit}
                onClickPage={this.handlePage}
              />
            </th>
          </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

ChargeLogListBox.displayName = 'ChargePointBox';
ChargeLogListBox.propTypes = {
  UserStore: PropTypes.object.isRequired,
  FireRequestGetMoreChargeLogList: PropTypes.func,
  FireGetVbankInfo: PropTypes.func,
};

export default ChargeLogListBox;
