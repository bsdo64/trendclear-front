import React from 'react';
import UserActions from '../../Actions/UserActions';
import CountUp from 'countup.js';
import moment from 'moment';
import AvatarImage from '../AvatarImage';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';



import AvatarImageContainer from '../../Container/Modal/AvatarImageContainer';

const Timer = React.createClass({
  getInitialState: function() {
    return {init: this.props.init || 0};
  },
  tick: function() {
    const type = this.props.type || 'default';

    this.setState({init: this.state.init - 1});
  },
  componentDidMount: function() {
    const type = this.props.type || 'default';

    if (this.state.init > 0 && !this[type]) {
      clearInterval(this[type]);
      this[type] = null;

      this[type] = setInterval(this.tick, 1000);
    }
  },
  componentWillReceiveProps(nextProps) {
    const self = this;
    const type = nextProps.type || 'default';

    if (nextProps.init > 0 && !this[type]) {
      this.setState({init: nextProps.init}, (state) => {
        "use strict";

        clearInterval(self[type]);
        self[type] = null;

        self[type] = setInterval(self.tick, 1000);
      });
    }
  },

  componentWillUnmount: function() {
    const type = this.props.type || 'default';
    clearInterval(this[type]);
    this[type] = null;
  },
  render: function() {
    const time = this.state.init;
    if (time === 0) {
      const type = this.props.type || 'default';
      clearInterval(this[type]);
      this[type] = null;
    }
    return (
      <span className={((time === 0) ? 'skill_cool_effect' : ((time > 0) ? 'skill_cool': ''))}>
        {this.state.init}
      </span>
    );
  }
});

require('./Trendbox.scss');
const TrendBox = React.createClass({
  getInitialState() {
    return {
      RPModal: false,
      VStore: false
    };
  },

  componentDidMount() {
    const {user} = this.props;
    const prevTotalExp = user.trendbox.get('prev_exp');
    const currentTotalExp = user.trendbox.get('exp');
    const nextTotalExp = user.trendbox.get('next_exp');

    const expPercent = (currentTotalExp - prevTotalExp) / (nextTotalExp - prevTotalExp) * 100;

    $('#exp_progress')
      .progress({
        percent: expPercent
      });
  },

  componentWillReceiveProps(nextProps) {
    const currentUser = this.props.user;
    const nextUser = nextProps.user;

    const prev_currentTotalExp = currentUser.trendbox.get('exp');
    const prev_nextTotalExp = currentUser.trendbox.get('next_exp');

    const prevTotalExp = nextUser.trendbox.get('prev_exp');
    const currentTotalExp = nextUser.trendbox.get('exp');
    const nextTotalExp = nextUser.trendbox.get('next_exp');

    let expPercent = (currentTotalExp - prevTotalExp) / (nextTotalExp - prevTotalExp) * 100;

    if ( expPercent >= 100 ) {
      expPercent = expPercent - 100;
      UserActions.levelUp();
    }

    if ( currentTotalExp != prev_currentTotalExp) {
      $('#exp_progress')
        .progress({
          percent: expPercent
        });
    }

    const options = {
      useEasing : true,
      useGrouping : true,
      separator : ',',
      decimal : '.',
      prefix : '',
      suffix : ''
    };

    const prevTP = currentUser.trendbox.get('T');
    const nextTP = nextUser.trendbox.get('T');
    this.updateCountUp("tp_point", prevTP, nextTP, options);

    const prevRP = currentUser.trendbox.get('R');
    const nextRP = nextUser.trendbox.get('R');
    this.updateCountUp("rp_point", prevRP, nextRP, options);

    this.updateCountUp("current_exp", prev_currentTotalExp, currentTotalExp, options);
    this.updateCountUp("next_exp", prev_nextTotalExp, nextTotalExp, options);
  },
  updateCountUp(nodeId, from, to, options) {
    "use strict";

    if (from != to ) {
      const count = new CountUp(nodeId, from, to, 0, 1.5, options);
      count.start();
    }
  },
  openAvatarModal() {
    "use strict";

    UserActions.openAvatarModalOpen();
  },
  openRPModal() {
    "use strict";

    this.setState({RPModal: !this.state.RPModal});
  },
  sendPayment() {
    "use strict";
    const IMP = window.IMP;
    IMP.init('imp27018207');

    IMP.request_pay({
      pg : 'html5_inicis', // version 1.1.0부터 지원.
      /*
       'kakao':카카오페이,
       'inicis':이니시스, 'html5_inicis':이니시스(웹표준결제),
       'nice':나이스,
       'jtnet':jtnet,
       'uplus':LG유플러스
       */
      pay_method : 'card', // 'card' : 신용카드 | 'trans' : 실시간계좌이체 | 'vbank' : 가상계좌 | 'phone' : 휴대폰소액결제
      merchant_uid : 'merchant_' + new Date().getTime(),
      name : '주문명:결제테스트',
      amount : 160,
      buyer_email : 'webmaster@venacle.com',
      buyer_name : '베나클',
      buyer_tel : '010-1234-5678',
      buyer_addr : '서울특별시 강남구 삼성동',
      buyer_postcode : '123-456'
    }, function(rsp) {
      if ( rsp.success ) {
        var msg = '결제가 완료되었습니다.';
        msg += '고유ID : ' + rsp.imp_uid;
        msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        msg += '카드 승인번호 : ' + rsp.apply_num;

        console.log(msg);
      } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;

        console.log(msg);
      }
    });
  },

  openVenacleStore() {
    "use strict";

    this.setState({VStore: !this.state.VStore}, ()=>{ReactTooltip.rebuild()});
  },

  createSkill(value, key) {
    "use strict";

    let usingTime, cooltimeSec, endTime, gap, result;
    if (value.get('using_at')) {
      usingTime = new Date(value.get('using_at'));
      cooltimeSec = value.getIn(['skill', 'property', 'cooltime']);
      endTime = new Date(moment(usingTime) + cooltimeSec * 1000);

      gap = (endTime.getTime() - new Date().getTime()) / 1000;
      result = gap > 0 ? parseInt(gap, 10) : 0;
    } else {
      result = 0;
    }

    return (
      <div
        data-tip
        data-for={value.getIn(['skill', 'name'])}
        data-offset="{'bottom': -10}"
        className="skill"
        key={key}>
        <Timer init={result} type={value.getIn(['skill', 'name'])} />
        <img className="ui image skill_image" src={'/images/' + value.getIn(['skill', 'img'])} />
        <ReactTooltip
          id={value.getIn(['skill', 'name'])}
          place="bottom"
          class="skill2"
          effect="solid">

          <div className="ui horizontal list">
            <div className="item">
              <img className="ui mini circular image" src={'/images/' + value.getIn(['skill', 'img'])} />
              <div className="content">
                <div className="ui sub header">{value.getIn(['skill', 'title'])}</div>
                <div className="meta level">레벨 : {value.getIn(['level'])}</div>
                <div className="meta cooltime">쿨타임 : {value.getIn(['skill', 'property', 'cooltime'])}</div>
              </div>
            </div>
          </div>
          <hr />
          {value.getIn(['skill', 'description'])}

        </ReactTooltip>
      </div>
    )
  },
  render() {
    const {user} = this.props;

    const sex = user.profile.get('sex'),
          avatar_img = user.profile.get('avatar_img'),
          iconDef = user.icon ? user.icon.get('iconDef'): null,
          icon_img = iconDef ? iconDef.get('icon_img'): null,
          grade_img = user.grade.getIn(['gradeDef', 'img']);
    let iconImg, gradeImg;

    if (icon_img) {
      iconImg = <img id="user_icon_img" src={'/images/' + icon_img}/>;
    }

    if (grade_img) {
      gradeImg = <img id="user_grade_img" src={'/images/' + grade_img}/>;
    }

    return (
      <div id="trend_box" className="widget">
        <div id="widget_user_info">
          <div className="ui items">
            <div className="ui item">

              <a id="user_avatar_img" className="ui mini image" onClick={this.openAvatarModal}>
                <AvatarImage
                  sex={sex}
                  avatarImg={avatar_img}
                />
              </a>
              <AvatarImageContainer />

              <div className="content">
                <div className="user_info_header">
                  <span className="ui description">{user.user.get('nick')}</span>
                  {iconImg}
                </div>
                <div className="description">

                  <div className="item" >
                    <span className="item_col">레벨</span>
                    <div className="item_num">
                      <span>{user.trendbox.get('level')}</span>
                    </div>
                  </div>

                  <div className="item">
                    <span className="item_col">명성</span>
                    <div className="item_num">
                      <span>{user.trendbox.get('reputation')}</span>
                    </div>
                  </div>

                  <div className="item">
                    <span className="item_col">랭크</span>
                    <div className="item_num">
                      <span>{gradeImg}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui item">
              <div id="stat_box">
                <div className="colum">
                  <h4 className="ui description title">트랜드 포인트</h4>
                  <div className="point_line">
                    <span className="ui description">TP</span>
                    <span id="tp_point" className="ui right floated point tp_point">{user.trendbox.get('T')}</span>
                  </div>
                  <div className="point_line">
                    <span className="ui description" >RP</span>
                    <span id="rp_point" className="ui right floated point rp_point">{user.trendbox.get('R')}</span>
                    <Modal
                      isOpen={this.state.RPModal}
                      onRequestClose={this.openRPModal}
                      >

                      <h2 ref="subtitle">Hello</h2>
                      <button onClick={this.openRPModal}>close</button>
                      <div>I am a modal</div>
                      <button onClick={this.sendPayment}>Pay </button>
                    </Modal>
                  </div>
                </div>
                <div className="colum">
                  <h4 className="ui description title">
                    {'경험치 '}
                    <div className="exp_description">
                      {'('}
                      <span id="current_exp">{user.trendbox.get('exp')}</span>
                      {'/'}
                      <span id="next_exp">{user.trendbox.get('next_exp')}</span>
                      {')'}
                    </div>
                  </h4>
                  <div className="exp_line">
                    <div id="exp_progress"
                         className="ui indicating small blue progress"
                    >
                      <div className="bar">
                        <div className="progress"></div>
                      </div>
                      <div className="label remain_exp">
                        나머지 {user.trendbox.get('next_exp') - user.trendbox.get('exp')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui item">

              <div id="store-button" className="content">
                <div className="description">

                  <div className="item" onClick={this.openVenacleStore}>
                    <span className="item_col">상점</span>
                    <div className="item_num">
                      <i className="fa fa-shopping-cart"></i>
                    </div>
                  </div>

                  <div className="item" onClick={this.openVenacleStore}>
                    <span className="item_col">포인트</span>
                    <div className="item_num">
                      <i className="fa fa-line-chart"></i>
                    </div>
                  </div>

                  <div className="item" onClick={this.openVenacleStore}>
                    <span className="item_col">베나링크</span>
                    <div className="item_num">
                      <i className="fa fa-unlink"></i>
                    </div>
                  </div>

                  <div className="item" onClick={this.openVenacleStore}>
                    <span className="item_col">인벤토리</span>
                    <div className="item_num">
                      <i className="fa fa-folder-open"></i>
                    </div>
                  </div>

                  <Modal
                    isOpen={this.state.VStore}
                    onRequestClose={this.openVenacleStore}
                    style={{
                      overlay: {backgroundColor: 'rgba(29, 29, 29, 0.8)', zIndex: 100},
                      content: {top: '10%', height: 900, bottom: 0, zIndex: 101}}}
                  >

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
                            <div className="card">

                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/venacle-item1-venalink.png" />

                              </div>
                              <div className="content">
                                <div className="header">베나링크 부여</div>
                                <div className="meta">
                                  <a>포스팅</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/venacle-item3-create-community.png" />
                              </div>
                              <div className="content">
                                <div className="header">커뮤니티 만들기</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
                            <div className="card">
                              <div
                                data-tip
                                data-for={'item'}
                                className="image" >
                                <img src="/images/sample.png" />
                              </div>
                              <div className="content">
                                <div className="header">링크 요청 부여</div>
                                <div className="meta">
                                  <a>포스트</a>
                                </div>
                              </div>
                              <div className="extra content">
                                <span>50 TP</span>
                              </div>
                              <div className="ui bottom attached button primary">
                                <i className="add icon"></i>
                                구입하기
                              </div>
                            </div>
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
                            <a className="header">{user.user.get('nick')} {iconImg}</a>
                            <div className="meta">
                              <span className="date">레벨 {user.trendbox.get('level')}</span>
                              <span className="date">명성 {user.trendbox.get('reputation')}</span>
                              <span className="date">랭크 </span>
                            </div>
                          </div>
                          <div className="content">
                            <div className="colum" style={{paddingBottom: 5}}>
                              <h4 className="ui description title" style={{marginBottom: 5}}>트랜드 포인트</h4>
                              <div className="point_line">
                                <span className="ui description">TP</span>
                                <span id="tp_point" className="ui right floated point tp_point">{user.trendbox.get('T')}</span>
                              </div>
                              <div className="point_line">
                                <span className="ui description" >RP</span>
                                <span id="rp_point" className="ui right floated point rp_point">{user.trendbox.get('R')}</span>
                              </div>
                            </div>
                            <span className="ui right floated point rp_point" onClick={this.sendPayment}>RP 충전</span>
                          </div>
                        </div>
                      </div>
                      <div className="user_inventory" >
                        <h4>인벤토리</h4>
                        <div className="inventory_box">
                          <ul className="inventory_tap">
                            <li className="active">포스팅</li>
                            <li>뱃지</li>
                            <li>이모티콘</li>
                          </ul>
                          <div className="inventory_scroll">
                            <table className="inventory_table">
                              <tbody>
                              <tr>
                                <td>
                                  <div className="content">
                                    <span className="item-count">12</span>
                                    <img className="item-image" src="/images/venacle-item1-venalink.png" />
                                  </div>
                                </td>
                                <td>
                                  <div className="content">
                                    <span className="item-count">12</span>
                                    <img className="item-image" src="/images/venacle-item3-create-community.png" />
                                  </div>
                                </td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                              </tr>
                              <tr>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                              </tr>
                              <tr>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                              </tr>
                              <tr>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                              </tr>
                              <tr>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                              </tr>
                              <tr>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                              </tr>
                              <tr>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                              </tr>
                              <tr>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                                <td><div className="content"></div></td>
                              </tr>
                              </tbody>
                            </table>

                          </div>

                        </div>
                      </div>
                    </div>

                  </Modal>
                  <ReactTooltip
                    id="item"
                    effect="solid"
                    place="bottom"
                  >
                    <div className="ui horizontal list">
                      <div className="item">
                        <img className="ui mini circular image" src={'/images/skill_0.jpg'} />
                        <div className="content">
                          <div className="ui sub header">글쓰기</div>
                          <div className="meta level">레벨 : 1</div>
                          <div className="meta cooltime">쿨타임 : 10 초</div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    포스트 하나에 링크 요청을 부여 할 수 있습니다
                  </ReactTooltip>
                </div>
              </div>
            </div>
            <div className="ui item">
              <div id="skill_box">
                <div className="colum">
                  <h4 className="ui description title">스킬</h4>
                  <div className="skill_line">
                    <div className="ui mini images skills">
                      {
                        user.skills &&
                        user.skills.sortBy(value => value.get('id')).map(this.createSkill)
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default TrendBox;
