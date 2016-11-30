import React, { PropTypes } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import moment from 'moment';
import { requestUserPaybackRP } from '../../Actions/User';

const VenalinkShareList = React.createClass({
  propTypes: {
    UserStore: PropTypes.object.isRequired,
    FireRequestUserPaybackRP: PropTypes.func.isRequired,
  },

  paybackRP(itemId) {
    return () => this.props.FireRequestUserPaybackRP({
      userVenalinkId: itemId
    })
  },

  createVenalinkItem(participatedList) {
    let status,
      isTerminate,
      hasPaybackRP = participatedList.get('has_payback_rp'),
      venalink = participatedList.get('venalink');
    switch (participatedList.get('venalink').get('is_activate')) {
      case true:
        status = '활성화';
        isTerminate = false;
        break;
      case false:
        status = '종료';
        isTerminate = true;
        break;
    }

    const isActiveStyle = cx({
      positive: !isTerminate,
      negative: isTerminate
    });

    const canPayback = isTerminate && participatedList.get('paid_r') > 0;
    const isDisabledRow = cx({
      disabled: !(canPayback || !isTerminate) || hasPaybackRP
    });

    return (
      <tr className={isDisabledRow} key={participatedList.get('id')}>
        <td>포스트</td>
        <td className={isActiveStyle}>{status}</td>
        <td className="right aligned">{moment(venalink.get('active_at')).format('YY/MM/DD hh:mm:ss')}</td>
        <td className="right aligned">{moment(venalink.get('terminate_at')).format('YY/MM/DD hh:mm:ss')}</td>
        <td className="positive right aligned">{venalink.get('participants').size}</td>
        <td className="right aligned">{venalink.get('pay_per_click_r')}</td>
        <td className="positive right aligned">{participatedList.get('count_visitor')}</td>
        <td className="right aligned">
          {
            (!isTerminate || participatedList.get('paid_r') <= 0 || hasPaybackRP) &&
            participatedList.get('paid_r')
          }

          {
            isTerminate && participatedList.get('paid_r') > 0 && !hasPaybackRP &&
            <div className="ui button primary tiny"
                 onClick={this.paybackRP(participatedList.get('id'))}
            >
              {
                participatedList.get('paid_r') + 'RP 받기'
              }
            </div>
          }

        </td>
        <td className="right aligned">{venalink.get('total_remain_r')}</td>
      </tr>
    )
  },

  render() {
    const { UserStore } = this.props;
    const participatedVenalinks = UserStore.get('participatedVenalinks');

    return (
      <div>
        <div className="ui cards centered" style={{ padding: 10 }}>
          <div className="card" style={{ width: '100%' }}>
            <div className="content">
              <div className="header">
                베나링크 참여 현황
              </div>
              <div className="description">
                <div className="ui two statistics">
                  <div className="statistic">
                    <div className="value">
                      22
                    </div>
                    <div className="label">
                      평균 방문자
                    </div>
                  </div>
                  <div className="statistic">
                    <div className="value">
                      1,200,232
                    </div>
                    <div className="label">
                      총 방문자
                    </div>
                  </div>
                  <div className="statistic">
                    <div className="value">
                      1,200
                    </div>
                    <div className="label">
                      평균 습득 RP
                    </div>
                  </div>
                  <div className="statistic">
                    <div className="value">
                      1,200,023
                    </div>
                    <div className="label">
                      총 습득 RP
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui bottom attached button">
              내역 보기
            </div>
          </div>
        </div>
        <div style={{ padding: 10 }}>
          <h4>베나링크 참여 리스트</h4>
          <table className="ui celled table">
            <thead>
            <tr>
              <th className="center aligned" style={{ width: 60 }}>타입</th>
              <th className="center aligned" style={{ width: 60 }}>상태</th>
              <th className="center aligned" style={{ width: 82 }}>요청 시간</th>
              <th className="center aligned" style={{ width: 82 }}>종료 시간</th>
              <th className="center aligned" style={{ width: 70 }}>참여<br />유저(명)</th>
              <th className="center aligned" style={{ width: 70 }}>방문당<br/>지급 RP</th>
              <th className="center aligned">나의 베나링크<br/>순 방문(명)</th>
              <th className="center aligned">총 지급 받은 RP</th>
              <th className="center aligned">남은 RP</th>
            </tr>
            </thead>
            <tbody>
            {
              participatedVenalinks &&
              participatedVenalinks.map(this.createVenalinkItem)
            }
            </tbody>
            <tfoot>
            <tr>
              <th colSpan="10">
                <div className="ui right floated pagination menu">
                  <a className="icon item">
                    <i className="left chevron icon"></i>
                  </a>
                  <a className="item active">1</a>
                  <a className="item">2</a>
                  <a className="item">3</a>
                  <a className="item">4</a>
                  <a className="icon item">
                    <i className="right chevron icon"></i>
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
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireRequestUserPaybackRP: requestUserPaybackRP,
  }
)(VenalinkShareList);
