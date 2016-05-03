import React from 'react';
import UserActions from '../../Actions/UserActions';

import AvatarImageContainer from '../../Container/Modal/AvatarImageContainer';

require('./Trendbox.scss');
const TrendBox = React.createClass({
  componentDidMount() {
    const {user} = this.props;

    $('#exp_progress')
      .progress({
        percent:  user.trendbox.get('exp') / user.trendbox.get('next_exp') * 100
      });
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
          icon_img = user.icon.get('img'),
          grade_img = user.grade.get('img');
    let avatarImg, iconImg, gradeImg;

    if (avatar_img) {
      avatarImg = <img src={'/images/files/' + avatar_img + '.png'} />;
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
                <AvatarImageContainer />
              </a>
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
              <div id="trend_box">
                <div className="colum">
                  <h4 className="ui description title">트랜드 포인트</h4>
                  <div className="point_line">
                    <span className="ui description">TP</span>
                    <span className="ui right floated point tp_point">{user.trendbox.get('T')}</span>
                  </div>
                  <div className="point_line">
                    <span className="ui description">RP</span>
                    <span className="ui right floated point rp_point">{user.trendbox.get('R')}</span>
                  </div>
                </div>
                <div className="colum">
                  <h4 className="ui description title">경험치</h4>
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
          </div>
        </div>
      </div>
    );
  }
});

export default TrendBox;
