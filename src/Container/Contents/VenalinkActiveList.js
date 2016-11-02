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

import moment from 'moment';

const VenalinkActiveList = connectToStores({
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
  createVenalinkItem(venalink) {
    "use strict";

    let status, positive;
    switch(venalink.get('is_activate')) {
      case true:
        status = '활성화';
        positive = 1;
        break;
      case false:
        status = '종료';
        positive = 0;
        break;
    }

    return (
      <tr key={venalink.get('id')}>
        <td>포스트</td>
        <td className="positive">{status}</td>
        <td className="right aligned">{moment(venalink.get('active_at')).format('YY/MM/DD hh:mm:ss')}</td>
        <td className="right aligned">{moment(venalink.get('terminate_at')).format('YY/MM/DD hh:mm:ss')}</td>
        <td className="positive right aligned">{venalink.get('participants').size}</td>
        <td className="right aligned ">{venalink.get('total_amount_r')}</td>
        <td className="right aligned">{venalink.get('pay_per_click_r')}</td>
        <td className="positive right aligned">{venalink.get('total_pay_r')/venalink.get('pay_per_click_r')}</td>
        <td className="right aligned">{venalink.get('total_pay_r')}</td>
        <td className="right aligned">{venalink.get('total_remain_r')}</td>
      </tr>
    )
  },
  render() {
    const {UserStore} = this.props;
    const venalinks = UserStore.get('venalinks');

    return (
      <div>
        <div className="ui cards centered" style={{padding: 10}}>
          <div className="card" style={{width: '100%'}}>
            <div className="content">
              <div className="header">
                베나링크 활성화 현황
              </div>
              <div className="description" >
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
                      평균 사용 RP
                    </div>
                  </div>
                  <div className="statistic">
                    <div className="value">
                      1,200,023
                    </div>
                    <div className="label">
                      총 사용 RP
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

        <div style={{padding: 10}}>
          <h4>베나링크 활성화 리스트</h4>
          <table className="ui celled table">
            <thead>
            <tr>
              <th className="center aligned" style={{width: 60}}>타입</th>
              <th className="center aligned" style={{width: 60}}>상태</th>
              <th className="center aligned" style={{width: 82}}>활성화<br />시간</th>
              <th className="center aligned" style={{width: 82}}>종료 시간</th>
              <th className="center aligned" style={{width: 70}}>참여<br />유저(명)</th>
              <th className="center aligned">활성 RP</th>
              <th className="center aligned" style={{width: 70}}>방문당<br/>지급 RP</th>
              <th className="center aligned" >순 방문<br/>(명)</th>
              <th className="center aligned">총 지급 RP</th>
              <th className="center aligned">남은 RP</th>
            </tr>
            </thead>
            <tbody>
            {
              venalinks &&
              venalinks.map(this.createVenalinkItem)
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
}));

module.exports = VenalinkActiveList;
