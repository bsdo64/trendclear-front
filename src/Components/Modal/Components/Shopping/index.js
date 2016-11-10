import React, {
  PropTypes,
} from 'react';
import VenaStoreActions from '../../../../Actions/VenaStoreActions';
import ReactTooltip from 'react-tooltip';
import AvatarImage from '../../../AvatarImage';
import Inventory from '../../../Inventory';

const rebuildTooltip = function rebuildTooltip(itemCode) {
  VenaStoreActions.tooltipInit(itemCode);
  ReactTooltip.rebuild();
};

require('./index.scss');
const Shopping = React.createClass({
  togglePurchaseWindow(item) {
    VenaStoreActions.togglePurchaseWindow(item);
  },
  openVenacleStore() {
    VenaStoreActions.toggleVenacleStore({
      contentType: 'Shopping'
    });
    VenaStoreActions.initItems();
  },

  render() {
    const {UserStore, ShoppingStore} = this.props;

    const sex = UserStore.getIn(['profile', 'sex']),
      avatar_img = UserStore.getIn(['profile', 'avatar_img']),
      iconDef = UserStore.get('icon') ? UserStore.getIn(['icon', 'iconDef']): null,
      icon_img = iconDef ? iconDef.get('icon_img'): null,
      grade_img = UserStore.getIn(['grade', 'gradeDef', 'img']);
    let iconImg, gradeImg;

    const inventory = UserStore.get('inventories').find(i => i.get('type') === 'community');

    if (icon_img) {
      iconImg = <img id="user_icon_img" src={'/images/' + icon_img}/>;
    }

    if (grade_img) {
      gradeImg = <img id="user_grade_img" src={'/images/' + grade_img}/>;
    }

    const filterTooltipItem = ShoppingStore
      .get('items')
      .filter(item => item.get('code') === ShoppingStore.get('tooltipItemCode'))
      .get(0);

    return (
      <div style={{top: '10%', height: 900, bottom: 0, zIndex: 102}}>
        <h2 ref="subtitle">베나클 스토어</h2>

        <div id="venacle_store">
          <div className="top_menu">
            <div className="ui secondary pointing menu">
              <a className="active item">
                커뮤니티
              </a>
              <a className="item">
                티켓
              </a>
              <a className="item">
                이벤트
              </a>
              <div className="right menu">
                <a className="ui item" onClick={this.openVenacleStore}>
                  나가기
                </a>
              </div>
            </div>
          </div>
          <div className="main_menu" >
            <div className="ui vertical menu">
              <a className="active teal item">
                메인
                <div className="ui teal left pointing label">1</div>
              </a>
              <a className="item">
                포스팅
                <div className="ui label">51</div>
              </a>
              <a className="item">
                뱃지
                <div className="ui label">1</div>
              </a>
              <a className="item">
                포인트
                <div className="ui label">1</div>
              </a>
              <div className="item">
                <div className="ui transparent icon input">
                  <input type="text" placeholder="Search mail..." />
                  <i className="search icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="contents" >
            <div className="ui pointing menu">
              <a className="active item">
                Home
              </a>
              <a className="item">
                Messages
              </a>
              <a className="item">
                Friends
              </a>
              <div className="right menu">
                <div className="item">
                  <div className="ui transparent icon input">
                    <input type="text" placeholder="Search..." />
                    <i className="search link icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui segment">
              <p >인기순</p>
            </div>
            <div className="ui segment item-list">
              <div className="ui link cards">
                {
                  ShoppingStore.get('items').map(item => {
                    return (
                      <div className="card" key={item.get('code')} >

                        <div
                          data-tip
                          data-for={'item'}
                          className="image"
                          onMouseOver={rebuildTooltip.bind(this, item.get('code'))}
                        >
                          <img src={item.get('image')} />

                        </div>
                        <div className="content">
                          <div className="header">{item.get('title')}</div>
                          <div className="meta">
                            <a>포스팅</a>
                          </div>
                        </div>
                        <div className="extra content">
                          <span>{item.get('attribute').get('price_t')} {item.get('attribute').get('price_type')}P</span>
                        </div>
                        <div className="ui bottom attached button primary" onClick={this.togglePurchaseWindow.bind(this, item)}>
                          <i className="add icon"></i>
                          구입하기
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="user_info">

            <div className="ui card">
              <div className="ui slide masked reveal image">
                <AvatarImage
                  sex={sex}
                  avatarImg={avatar_img}
                  noWrap={true}
                />
              </div>
              <div className="content">
                <a className="header">{UserStore.getIn(['user', 'nick'])} {iconImg}</a>
                <div className="meta">
                  <span className="date">레벨 {UserStore.getIn(['trendbox', 'level'])}</span>
                  <span className="date">명성 {UserStore.getIn(['trendbox', 'reputation'])}</span>
                  <span className="date">랭크 </span>
                </div>
              </div>
              <div className="content">
                <div className="colum" style={{paddingBottom: 5}}>
                  <h4 className="ui description title" style={{marginBottom: 5}}>트랜드 포인트</h4>
                  <div className="point_line">
                    <span className="ui description">TP</span>
                    <span id="tp_point" className="ui right floated point tp_point">{UserStore.getIn(['trendbox', 'T'])}</span>
                  </div>
                  <div className="point_line">
                    <span className="ui description" >RP</span>
                    <span id="rp_point" className="ui right floated point rp_point">{UserStore.getIn(['trendbox', 'R'])}</span>
                  </div>
                </div>
                <span className="ui right floated point rp_point" onClick={this.sendPayment}>RP 충전</span>
              </div>
            </div>
          </div>
          <Inventory
            inventory={inventory}
            ShoppingStore={ShoppingStore}
          />
        </div>

      </div>
    );
  }
});

export default Shopping;
