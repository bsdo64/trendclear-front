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

const PointListContainer = connectToStores({
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
        <div className="ui cards centered" style={{paddingTop: 20}}>
          <div className="card" style={{width: 350}}>
            <div className="content">
              <div className="header">
                나의 TP

              </div>
              <div className="description" style={{paddingBottom: 10, fontSize: 42, textAlign: 'right'}}>
                100,000,000 P
              </div>
            </div>
            <div className="ui bottom attached button">
              내역 보기
            </div>
          </div>
          <div className="card" style={{width: 350}}>
            <div className="content">
              <div className="header">나의 RP</div>
              <div className="description" style={{paddingBottom: 10, fontSize: 42, textAlign: 'right'}}>
                0 P
              </div>
              <div className="description" style={{textAlign: 'right'}}>
                충전하기
              </div>
            </div>
            <div className="ui bottom attached button">
              내역 보기
            </div>
          </div>
        </div>
        <div style={{padding: 10}}>
          <h4>TP 내역</h4>
          <table className="ui celled table">
            <thead>
            <tr>
              <th className="one wide">획득 / 사용</th>
              <th className="four wide">타입</th>
              <th className="two wide">시간</th>
              <th>금액</th>
              <th className="two wide">수량</th>
              <th>총계</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className="positive">획득</td>
              <td>글쓰기</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="positive right aligned">+ 150</td>
              <td className="right aligned ">1</td>
              <td className="right aligned">3150</td>
            </tr>
            <tr><td><div>
              <div className="ui content">
                <div className="meta best_post_meta">
                  <div className="ui horizontal divided list">
                    <div className="item"><a href="/community?forumId=141">aasdfadsfadf</a></div>
                  </div>
                </div>
                <h3 className="best_post_title"><a href="/community?forumId=141&amp;postId=231">asdf</a>
                </h3>
                <div className="meta best_post_meta">
                  <div className="ui horizontal divided list">
                    <div className="item">
                      <div className="author_nick"><a >nick1</a>
                        <div className="__react_component_tooltip type-dark " data-id="tooltip"></div>
                      </div>
                      <div className="author_icon"></div>
                    </div>
                    <div className="item">하루 전</div>
                  </div>
                </div>
                <div className="ui description best_post_content"><p className="">asdvasdfe</p></div>

              </div>
            </div></td></tr>
            <tr>
              <td className="negative">사용</td>
              <td>글쓰기</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="negative right aligned">- 150</td>
              <td className="right aligned ">1</td>
              <td className="right aligned">3150</td>
            </tr>
            <tr>
              <td className="positive">획득</td>
              <td>글쓰기</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="positive right aligned">+ 150</td>
              <td className="right aligned ">1</td>
              <td className="right aligned">3150</td>
            </tr>
            <tr>
              <td className="positive">획득</td>
              <td>글쓰기</td>
              <td className="right aligned">2013-11-11<br />15:43</td>
              <td className="positive right aligned">+ 150</td>
              <td className="right aligned ">1</td>
              <td className="right aligned">3150</td>
            </tr>
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
