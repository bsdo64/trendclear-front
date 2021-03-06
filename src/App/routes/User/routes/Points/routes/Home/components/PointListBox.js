import React from 'react';
import PropTypes from 'prop-types';
import accounting from 'accounting';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import moment from '../../../../../../../Lib/MomentLib';
import TablePagination from '../../../../../../../components/Paginator/TablePagination';

class PointListBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pointType: 'TP',
      page: 1,
    };

    this.togglePointType = this.togglePointType.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.handleClickPage = this.handleClickPage.bind(this);
  }

  togglePointType(point) {
    this.props.FireRequestMoreAccountList({
      pointType: point,
      p: 1,
    });

    this.setState({
      pointType: point,
      page: 1,
    });
  }

  createAccount(account) {
    let type, itemType, totalPoint, amountPoint, positive;
    switch (account.get('type')) {
      case 'initial':
        type = '초기';
        positive = 1;
        break;
      case 'withdraw':
        type = '소비';
        positive = 0;
        break;
      case 'deposit':
        type = '획득';
        positive = 1;
        break;
      default:
        type = '오류';
    }

    switch (account.getIn(['trade', 'action'])) {
      case 'purchaseItem':
        itemType = '아이템 구입';
        break;
      case 'activateVenalink':
        itemType = '베나링크 활성화';
        break;
      case 'write_post':
        itemType = '새로운 글 생성';
        break;
      case 'write_forum':
        itemType = '게시판 생성';
        break;
      case 'write_comment':
        itemType = '댓글 작성';
        break;
      case 'write_sub_comment':
        itemType = '대댓글 작성';
        break;
      case 'sharelink_new_visitor':
        itemType = '쉐어링크 순방문';
        break;
      case 'refundVenalink':
        itemType = '미사용 RP 환급';
        break;
      case 'paybackVenalink':
        itemType = '페이백 RP';
        break;
      case 'charge_rp':
        itemType = 'RP 충전';
        break;
      case 'cancelled_rp':
        itemType = 'RP 충전 취소';
        break;
      case undefined:
        itemType = '';
        break;
      default:
        itemType = '알 수 없는 타입';
    }

    switch (this.state.pointType) {
      case 'TP':
        totalPoint = account.get('total_t');
        amountPoint = account.getIn(['trade', 'amount_t']);
        break;
      case 'RP':
        totalPoint = account.get('total_r');
        amountPoint = account.getIn(['trade', 'amount_r']);
        break;
    }

    const positiveRightStyle = cx('right aligned', {
      positive: positive,
      negative: !positive,
    });
    const positiveCenterStyle = cx('center aligned', {
      positive: positive,
      negative: !positive,
    });

    return (
      <tr key={account.get('id')}>
        <td className="center aligned">{moment(account.get('created_at'))
          .format('YYYY/MM/DD HH:mm')}</td>
        <td className={positiveCenterStyle}>{type}</td>
        <td>{itemType}</td>
        <td className="right aligned ">{account.getIn(
          ['trade', 'target_count'])}</td>
        <td className={positiveRightStyle}>{positive
          ? '+'
          : '-'} {accounting.formatNumber(amountPoint)}</td>
        <td className="right aligned" style={{color: '#058294'}}>
          <b>{accounting.formatNumber(totalPoint)}</b></td>
      </tr>
    );
  }

  handleClickPage(p) {
    return () => {
      this.props.FireRequestMoreAccountList({
        pointType: this.state.pointType,
        p: p,
      });

      this.setState({
        page: p,
      });
    };
  }

  render() {
    const {UserStore} = this.props;
    const userAccount = UserStore.getIn(['account']);
    const accounts = UserStore.getIn(['account', 'results']);
    const totalAccounts = UserStore.getIn(['account', 'total']) || 0;
    const trendbox = UserStore.get('trendbox');
    const length = userAccount && userAccount.get('limit') || 1;
    const totalPage = userAccount && Math.ceil(totalAccounts / length);

    const isTP = this.state.pointType === 'TP';
    const isRP = this.state.pointType === 'RP';
    const activeButtonStyleTP = cx('ui bottom attached button', {
      active: isTP,
      primary: isTP,
    });
    const activeButtonStyleRP = cx('ui bottom attached button', {
      active: isRP,
      primary: isRP,
    });

    return (
      <div>
        <div className="ui cards centered" style={{paddingTop: 20}}>
          <div className="card" style={{width: 280}}>
            <div className="content">
              <div className="header">
                나의 TP

              </div>
              <div className="description" style={{
                paddingBottom: 10,
                fontSize: 42,
                textAlign: 'right',
              }}>
                {trendbox && accounting.formatNumber(trendbox.get('T'))} P
              </div>
            </div>
            <div className={activeButtonStyleTP}
                 onClick={this.togglePointType.bind(this, 'TP')}>
              내역 보기
            </div>
          </div>
          <div className="card" style={{width: 280}}>
            <div className="content">
              <div className="header">나의 RP</div>
              <div className="description" style={{
                paddingBottom: 10,
                fontSize: 42,
                textAlign: 'right',
              }}>
                {trendbox && accounting.formatNumber(trendbox.get('R'))} P
              </div>
              <div className="description" style={{textAlign: 'right'}}>
                <Link to="/user/chargePoint">충전하기</Link>
              </div>
            </div>
            <div className={activeButtonStyleRP}
                 onClick={this.togglePointType.bind(this, 'RP')}>
              내역 보기
            </div>
          </div>
        </div>
        <div style={{padding: 10, paddingBottom: 20}}>
          <h4>{this.state.pointType} 내역 {`(${totalAccounts})`}</h4>
          <table className="ui celled table" style={{fontSize: 12}}>
            <thead>
            <tr>
              <th className="three wide" style={{textAlign: 'center'}}>시간</th>
              <th className="one wide" style={{textAlign: 'center'}}>사용</th>
              <th className="tree wide" style={{textAlign: 'center'}}>타입</th>
              <th className="one wide" style={{textAlign: 'center'}}>수량</th>
              <th style={{textAlign: 'center'}}>금액</th>
              <th style={{textAlign: 'center'}}>총계</th>
            </tr>
            </thead>
            <tbody>
            {
              accounts &&
              accounts
                .filter(a => (a.get('point_type') === this.state.pointType) ||
                (a.get('point_type') === 'Both'))
                .map(this.createAccount)
            }
            </tbody>
            <tfoot>
            <tr>
              <th colSpan="6">
                <TablePagination
                  totalPage={totalPage}
                  currentPage={this.state.page}
                  pageLimit={length}
                  onClickPage={this.handleClickPage}
                />
              </th>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

PointListBox.displayName = 'ChargePointBox';
PointListBox.propTypes = {
  UserStore: PropTypes.object.isRequired,
  FireRequestMoreAccountList: PropTypes.func,
};

export default PointListBox;
