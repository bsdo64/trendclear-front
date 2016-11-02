import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import alt from '../../Utils/alt';

import LoginStore from '../../Stores/LoginStore';
import CommunityStore from '../../Stores/CommunityStore';
import SearchStore from '../../Stores/SearchStore';
import GnbStore from '../../Stores/GnbStore';

import Posts from '../../Stores/Domain/Posts';
import Users from '../../Stores/Domain/Users';
import Forums from '../../Stores/Domain/Forums';
import Collections from '../../Stores/Domain/Collections';

import AuthStore from '../../Stores/UI/AuthStore';
import LoginModalStore from '../../Stores/UI/LoginModalStore';
const PaginationStore = alt.getStore('PaginationStore');
const ListStore = alt.getStore('ListStore');

import cx from 'classnames';
import moment from 'moment';

const PointListContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      GnbStore,
      LoginStore,
      CommunityStore,
      SearchStore,

      // UI Stores
      LoginModalStore,
      AuthStore,
      PaginationStore,
      ListStore,

      // Domain Stores
      Posts,
      Users,
      Forums,
      Collections,
    ]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      LoginStore: LoginStore.getState(),
      CommunityStore: CommunityStore.getState(),
      SearchStore: SearchStore.getState(),

      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
      PaginationStore: PaginationStore.getState(),
      ListStore: ListStore.getState(),

      AuthStore:        AuthStore.getState(),
      LoginModalStore:  LoginModalStore.getState(),

      Forums:           Forums.getState(),
      Users:            Users.getState(),
      Posts:            Posts.getState(),
      Collections:            Collections.getState()
    }
  }
}, React.createClass({
  getInitialState() {
    return {
      pointType: 'TP',

    };
  },

  togglePointType(point) {
    "use strict";

    this.setState({pointType: point});
  },

  createAccount(account) {
    "use strict";

    const {AuthStore} = this.props;
    const userId = AuthStore.get('userId');

    let type, itemType, totalPoint, amountPoint, positive;
    switch(account.get('type')) {
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

    switch(account.getIn(['trade', 'action'])) {
      case 'purchaseItem':
        itemType = '아이템 구입';
        break;
      case 'activateVenalink':
        itemType = '베나링크 활성화';
        break;
      case undefined:
        itemType = '';
        break;
      default:
        itemType = '알 수 없는 타입';
    }

    switch(this.state.pointType) {
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
        <td className={positiveRightStyle}>{positive  ? '+' : '-'} {amountPoint}</td>
        <td className="right aligned">{totalPoint}</td>
      </tr>
    )
  },

  render() {
    const {UserStore} = this.props;
    const accounts = UserStore.get('account');
    const trendbox = UserStore.get('trendbox');

    return (
      <div>
        <div className="ui cards centered" style={{paddingTop: 20}}>
          <div className="card" style={{width: 350}}>
            <div className="content">
              <div className="header">
                나의 TP

              </div>
              <div className="description" style={{paddingBottom: 10, fontSize: 42, textAlign: 'right'}}>
                {trendbox.get('T')} P
              </div>
            </div>
            <div className="ui bottom attached button" onClick={this.togglePointType.bind(this, 'TP')}>
              내역 보기
            </div>
          </div>
          <div className="card" style={{width: 350}}>
            <div className="content">
              <div className="header">나의 RP</div>
              <div className="description" style={{paddingBottom: 10, fontSize: 42, textAlign: 'right'}}>
                {trendbox.get('R')} P
              </div>
              <div className="description" style={{textAlign: 'right'}}>
                충전하기
              </div>
            </div>
            <div className="ui bottom attached button" onClick={this.togglePointType.bind(this, 'RP')}>
              내역 보기
            </div>
          </div>
        </div>
        <div style={{padding: 10}}>
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
}));

module.exports = PointListContainer;
