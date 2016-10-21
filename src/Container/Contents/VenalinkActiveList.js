import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import alt from '../../Utils/alt';

import LoginStore from '../../Stores/LoginStore';
import CommunityStore from '../../Stores/CommunityStore';
import UserStore from '../../Stores/UserStore';
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

const VenalinkActiveList = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [
      GnbStore,
      LoginStore,
      CommunityStore,
      UserStore,
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

      UserStore: UserStore.getState(),
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
  render() {
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
            <tr>
              <td>포스트</td>
              <td className="positive">활성화</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="positive right aligned">12</td>
              <td className="right aligned ">100,000</td>
              <td className="right aligned">5</td>
              <td className="positive right aligned">12,000</td>
              <td className="right aligned">60,000</td>
              <td className="right aligned">40,000</td>
            </tr>
            <tr>
              <td>포스트</td>
              <td className="positive">활성화</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="positive right aligned">12</td>
              <td className="right aligned ">100,000</td>
              <td className="right aligned">5</td>
              <td className="positive right aligned">12,000</td>
              <td className="right aligned">60,000</td>
              <td className="right aligned">40,000</td>
            </tr>
            <tr>
              <td>포스트</td>
              <td className="positive">활성화</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="positive right aligned">12</td>
              <td className="right aligned ">100,000</td>
              <td className="right aligned">5</td>
              <td className="positive right aligned">12,000</td>
              <td className="right aligned">60,000</td>
              <td className="right aligned">40,000</td>
            </tr>
            <tr>
              <td>포스트</td>
              <td className="positive">활성화</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="positive right aligned">12</td>
              <td className="right aligned ">100,000</td>
              <td className="right aligned">5</td>
              <td className="positive right aligned">12,000</td>
              <td className="right aligned">60,000</td>
              <td className="right aligned">40,000</td>
            </tr>
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
