import React, { PropTypes } from 'react';
import { getLoginUser } from '../Util/func';
import { connect } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';

const PointListBox = React.createClass({
  displayName: 'ChargePointBox',
  propTypes: {
    UserStore: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      pointType: 'TP',

    };
  },

  togglePointType(point) {
    this.setState({ pointType: point });
  },

  createAccount(account) {
    let type, itemType, totalPoint, amountPoint, positive;
    switch (account.get('type')) {
      case 'initial':
        type = '초기화';
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
      negative: !positive
    });
    const positiveCenterStyle = cx('center aligned', {
      positive: positive,
      negative: !positive
    });

    return (
      <tr key={account.get('id')}>
        <td className={positiveCenterStyle}>{type}</td>
        <td>{itemType}</td>
        <td className="right aligned">{moment(account.get('created_at')).format('YYYY/MM/DD hh:mm')}</td>
        <td className="right aligned ">{account.getIn(['trade', 'target_count'])}</td>
        <td className={positiveRightStyle}>{positive ? '+' : '-'} {amountPoint}</td>
        <td className="right aligned">{totalPoint}</td>
      </tr>
    )
  },

  render() {
    const { UserStore } = this.props;
    const accounts = UserStore.get('account');
    const trendbox = UserStore.get('trendbox');

    return (
      <div>
        <div className="ui cards centered" style={{ paddingTop: 20 }}>
          <div className="card" style={{ width: 350 }}>
            <div className="content">
              <div className="header">
                나의 TP

              </div>
              <div className="description" style={{ paddingBottom: 10, fontSize: 42, textAlign: 'right' }}>
                {trendbox.get('T')} P
              </div>
            </div>
            <div className="ui bottom attached button" onClick={this.togglePointType.bind(this, 'TP')}>
              내역 보기
            </div>
          </div>
          <div className="card" style={{ width: 350 }}>
            <div className="content">
              <div className="header">나의 RP</div>
              <div className="description" style={{ paddingBottom: 10, fontSize: 42, textAlign: 'right' }}>
                {trendbox.get('R')} P
              </div>
              <div className="description" style={{ textAlign: 'right' }}>
                충전하기
              </div>
            </div>
            <div className="ui bottom attached button" onClick={this.togglePointType.bind(this, 'RP')}>
              내역 보기
            </div>
          </div>
        </div>
        <div style={{ padding: 10 }}>
          <h4>TP 내역</h4>
          <table className="ui celled table">
            <thead>
            <tr>
              <th className="two wide">획득 / 사용</th>
              <th className="two wide">타입</th>
              <th className="three wide">시간</th>
              <th className="two wide">수량</th>
              <th>금액</th>
              <th>총계</th>
            </tr>
            </thead>
            <tbody>
            {
              accounts &&
              accounts
                .filter(a => (a.get('point_type') === this.state.pointType) || (a.get('point_type') === 'Both'))
                .map(this.createAccount)
            }
            </tbody>
            <tfoot>
            <tr>
              <th colSpan="6">
                <div className="ui right floated pagination menu">
                  <a className="icon item">
                    <i className="left chevron icon"/>
                  </a>
                  <a className="item active">1</a>
                  <a className="item">2</a>
                  <a className="item">3</a>
                  <a className="item">4</a>
                  <a className="icon item">
                    <i className="right chevron icon"/>
                  </a>
                </div>
              </th>
            </tr>
            </tfoot>
          </table>
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

const mapDispatchToProps = (/* dispatch */) => {
  return {}
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PointListBox);
