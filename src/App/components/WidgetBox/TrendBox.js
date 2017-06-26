import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import accounting from 'accounting';
import CountUp from 'countup.js';
import AvatarImage from '../AvatarImage';

require('./Trendbox.scss');
class TrendBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      RPModal: false,
      VStore: false,
      wide: false,
    };

    this.updateCountUp = this.updateCountUp.bind(this);
    this.openAvatarModal = this.openAvatarModal.bind(this);
    this.openRPModal = this.openRPModal.bind(this);
    this.openVenacleStore = this.openVenacleStore.bind(this);
    this.toggleInventory = this.toggleInventory.bind(this);
    this.toggleWideBox = this.toggleWideBox.bind(this);
  }
  componentDidMount() {
    const {user} = this.props;
    const prevTotalExp = user.getIn(['trendbox', 'prev_exp']);
    const currentTotalExp = user.getIn(['trendbox', 'exp']);
    const nextTotalExp = user.getIn(['trendbox', 'next_exp']);

    const expPercent = (currentTotalExp - prevTotalExp) /
      (nextTotalExp - prevTotalExp) * 100;

    $('#exp_progress')
      .progress({
        percent: expPercent,
      });
  }

  componentWillReceiveProps(nextProps) {
    const currentUser = this.props.user;
    const nextUser = nextProps.user;

    const prev_currentTotalExp = currentUser.getIn(['trendbox', 'exp']);
    const prev_nextTotalExp = currentUser.getIn(['trendbox', 'next_exp']);

    const prevTotalExp = nextUser.getIn(['trendbox', 'prev_exp']);
    const currentTotalExp = nextUser.getIn(['trendbox', 'exp']);
    const nextTotalExp = nextUser.getIn(['trendbox', 'next_exp']);

    let expPercent = (currentTotalExp - prevTotalExp) /
      (nextTotalExp - prevTotalExp) * 100;

    if (expPercent >= 100) {
      expPercent = expPercent - 100;
    }

    if (currentTotalExp !== prev_currentTotalExp) {
      $('#exp_progress')
        .progress({
          percent: expPercent,
        });
    }

    const options = {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
      prefix: '',
      suffix: '',
    };

    const prevTP = currentUser.getIn(['trendbox', 'T']);
    const nextTP = nextUser.getIn(['trendbox', 'T']);
    this.updateCountUp('tp_point', prevTP, nextTP, options);

    const prevRP = currentUser.getIn(['trendbox', 'R']);
    const nextRP = nextUser.getIn(['trendbox', 'R']);
    this.updateCountUp('rp_point', prevRP, nextRP, options);

    this.updateCountUp('current_exp', prev_currentTotalExp, currentTotalExp,
      options);
    this.updateCountUp('next_exp', prev_nextTotalExp, nextTotalExp, options);
  }

  updateCountUp(nodeId, from, to, options) {

    if (from !== to) {
      const count = new CountUp(nodeId, from, to, 0, 1.5, options);
      count.start();
    }
  }

  openAvatarModal() {
    this.props.FireToggleAvatarModal({
      contentType: 'AvatarImage',
    });
  }
  openRPModal() {
    this.setState({RPModal: !this.state.RPModal});
  }

  openVenacleStore() {

    this.props.FireToggleVenacleStoreModal({
      contentType: 'Shopping',
    });
    this.props.FireRequestShoppingItemInit();
  }

  toggleInventory() {
    this.props.FireToggleShowInventory();
  }

  toggleWideBox() {
    this.props.FireToggleTrendBox();
  }

  render() {
    const {
      user, widgetBox,
    } = this.props;

    const sex = user.getIn(['profile', 'sex']),
      avatar_img = user.getIn(['profile', 'avatar_img']),
      iconDef = user.getIn(['icon', 'iconDef']),
      icon_img = iconDef ? iconDef.get('icon_img') : null,
      grade_img = user.getIn(['grade', 'gradeDef', 'img']);
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
            <div className="ui item upward" onClick={this.toggleWideBox}>
              {
                widgetBox && !widgetBox.get('toggleTrendBox') &&
                <i className="fa fa-caret-up"/>
              }

              {
                widgetBox && widgetBox.get('toggleTrendBox') &&
                <i className="fa fa-caret-down"/>
              }
            </div>
            <div className="ui item">

              <a id="user_avatar_img" className="ui mini image" style={{minHeight: 35}}
                 onClick={this.openAvatarModal}>
                <AvatarImage
                  sex={sex}
                  avatarImg={avatar_img}
                />
              </a>

              <div className="content">
                <div className="user_info_header">
                  <span className="ui description">{user.get('nick')}</span>
                  {iconImg}

                  <div className="user_info">
                    <span className="item_col">Lv. {user.getIn(['trendbox', 'level'])}</span>
                    <span className="item_col">Rep. {user.getIn(['trendbox', 'reputation'])}</span>
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
                    <span id="tp_point"
                          className="ui right floated point tp_point">
                      {accounting.formatNumber(user.getIn(['trendbox', 'T']))}</span>
                  </div>
                  <div className="point_line">
                    <span className="ui description">RP</span>
                    <span id="rp_point"
                          className="ui right floated point rp_point">
                      {accounting.formatNumber(user.getIn(['trendbox', 'R']))}</span>
                  </div>
                </div>
                <div className="colum">
                  <h4 className="ui description title">
                    {'경험치 '}
                    <div className="exp_description">
                      {'('}
                      <span id="current_exp">{user.getIn(['trendbox', 'exp'])}</span>
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
                        나머지 {user.getIn(['trendbox', 'next_exp']) -
                      user.getIn(['trendbox', 'exp'])}
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
                    <i className="fa fa-shopping-cart"></i>
                    <span className="item_col">상점</span>
                  </div>

                  <div className="item">
                    <Link to="/user/points">
                      <i className="fa fa-line-chart"></i>
                      <span className="item_col">포인트</span>
                    </Link>
                  </div>

                  <div className="item">
                    <Link to="/user/venalinks">
                      <i className="fa fa-unlink"></i>
                      <span className="item_col">베나링크</span>
                    </Link>
                  </div>

                  <div className="item" onClick={this.toggleInventory}>
                    <i className="fa fa-folder-open"></i>
                    <span className="item_col">인벤토리</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TrendBox.propTypes = {
  user: PropTypes.object.isRequired,
  widgetBox: PropTypes.object.isRequired,
  FireToggleVenacleStoreModal: PropTypes.func.isRequired,
  FireToggleAvatarModal: PropTypes.func.isRequired,
  FireRequestShoppingItemInit: PropTypes.func.isRequired,
  FireToggleShowInventory: PropTypes.func.isRequired,
  FireToggleTrendBox: PropTypes.func.isRequired,
};

export default TrendBox;
