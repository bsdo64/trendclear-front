import React from 'react';
import UserActions from '../../Actions/UserActions';
import CountUp from 'countup.js';
import moment from 'moment';

import ReactTooltip from 'react-tooltip';

import AvatarImageContainer from '../../Container/Modal/AvatarImageContainer';

const Timer = React.createClass({
  getInitialState: function() {
    return {init: this.props.init || 0};
  },
  tick: function() {
    const type = this.props.type || 'default';

    console.log(this[type])
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
    console.log('nextProps :', nextProps);
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

    // Update countUp
    function updateCountUp(nodeId, from, to) {
      "use strict";

      if (from != to ) {
        const options = {
          useEasing : true,
          useGrouping : true,
          separator : ',',
          decimal : '.',
          prefix : '',
          suffix : ''
        };

        const count = new CountUp(nodeId, from, to, 0, 1.5, options);
        count.start();
      }
    }

    const prevTP = currentUser.trendbox.get('T');
    const nextTP = nextUser.trendbox.get('T');
    updateCountUp("tp_point", prevTP, nextTP);

    const prevRP = currentUser.trendbox.get('R');
    const nextRP = nextUser.trendbox.get('R');
    updateCountUp("rp_point", prevRP, nextRP);

    updateCountUp("current_exp", prev_currentTotalExp, currentTotalExp);
    updateCountUp("next_exp", prev_nextTotalExp, nextTotalExp);
  },
  test() {
    "use strict";

    UserActions.increaseLevel();
  },
  openAvatarModal() {
    "use strict";

    UserActions.openAvatarModalOpen();
  },
  render() {
    const {user} = this.props;

    const sex = user.profile.get('sex'),
          avatar_img = user.profile.get('avatar_img'),
          iconDef = user.icon ? user.icon.get('iconDef'): null,
          icon_img = iconDef ? iconDef.get('icon_img'): null,
          grade_img = user.grade.getIn(['gradeDef', 'img']);
    let avatarImg, iconImg, gradeImg;

    if (avatar_img) {
      avatarImg = <img src={'/image/uploaded/files/' + avatar_img} />;
    } else {
      if (sex) {
        avatarImg = <img src="/images/default-male.png" />;
      } else {
        avatarImg = <img src="/images/default-female.png" />;
      }
    }

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
                { avatarImg }
              </a>
              <AvatarImageContainer />

              <div className="content">
                <div className="user_info_header">
                  <span className="ui description">{user.user.get('nick')}</span>
                  {iconImg}
                </div>
                <div className="description">

                  <div className="item" onClick={this.test}>
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
                    <span className="ui description">RP</span>
                    <span id="rp_point" className="ui right floated point rp_point">{user.trendbox.get('R')}</span>
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
              <div id="skill_box">
                <div className="colum">
                  <h4 className="ui description title">스킬</h4>
                  <div className="skill_line">
                    <div className="ui mini images skills">
                      {
                        user.skills &&
                        user.skills.sortBy(value => value.get('id')).map((value, key) => {

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
                        })
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
