/**
 * Created by dobyeongsu on 2016. 10. 26..
 */
import React from 'react';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import Modal from 'react-modal';
import InputNumber from 'rc-input-number';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import VenaStoreActions from '../../Actions/VenaStoreActions';

const LinkMenu = React.createClass({
  getInitialState() {
    return {
      openVenalink: false,
      venalinkRP: '',
      startDate: moment().add(1, 'days')
    };
  },

  checkMaxRP(v) {
    "use strict";
    const {user} = this.props;
    const maxRP = user.get('trendbox').get('R');

    if (v <= maxRP) {
      this.setState({
        venalinkRP : v,
        venalinkRPCheck: true
      });
    }
  },

  handleChangeDate(moment) {

    this.setState({
      startDate: moment
    });
  },

  requestActivateVenalink(activateItem) {
    "use strict";
    if (activateItem) {
      const item = activateItem.get('item');
      const {post} = this.props;

      this.setState({
        openVenalink: false
      });

      if (this.state.venalinkRP > 1000) {
        VenaStoreActions.requestActivateVenalink({
          total_amount_r: this.state.venalinkRP,
          terminate_at: this.state.startDate,
          post_id: post.get('id'),
          activate_item_id: item.get('id'),
          active_at: new Date()
        });
      }
    }
  },

  copyLink(refId) {
    "use strict";
    this.refs[refId].select();
    document.execCommand('copy');
  },
  toggleVenalink() {
    "use strict";

    if (!this.state.openVenalink && this.el) {
      this.el.removeEventListener('click', this.stopPropagation, false);
    }

    this.setState({openVenalink: !this.state.openVenalink});
  },

  stopBeforeEvent() {

    this.el = document.getElementsByClassName('activate-modal')[0];
    this.el.addEventListener('click', this.stopPropagation, false);
  },

  stopPropagation(e) {
    e.stopPropagation();
  },

  requestParticipateVenalink(venalinkId, participateItem) {
    "use strict";
    if (participateItem) {
      const item = participateItem.get('item');

      this.setState({
        openVenalink: false
      });

      if (venalinkId) {
        VenaStoreActions.requestParticipateVenalink({
          venalink_id: venalinkId,
          used_venalink_item_id: item.get('id'),
          request_at: new Date()
        })
      }
    }
  },

  isUsersPost(author, userId) {
    "use strict";

    return userId === author.get('id');
  },

  isActivateVenalinkPost(post) {
    "use strict";

    if (post.get('venalinks') && post.get('venalinks').size > 0) {
      return post.get('venalinks').find(i => i.get('is_activate') === true)
    } else {
      return false;
    }
  },

  isParticipateVenalink(venalink) {
    "use strict";

    const {userId} = this.props;

    if (venalink) {
      if (venalink.get('participants')) {
        return venalink.get('participants').find(i => i.get('user_id') === userId)
      }
    }

    return false;

  },

  createShareLink(linkId) {
    "use strict";
    if (process.env.NODE_ENV === 'production') {
      return `http://venacle.com/link/post/m/${linkId}`;
    } else {
      return `http://localhost:3000/link/post/m/${linkId}`;
    }
  },

  createMyVenalinkUrl(myParticipate) {
    "use strict";

    if (myParticipate) {
      if (process.env.NODE_ENV === 'production') {
        return `http://venacle.com/venalink/post/m/${myParticipate.get('venalink_uid')}`;
      } else {
        return `http://localhost:3000/venalink/post/m/${myParticipate.get('venalink_uid')}`;
      }
    } else {
      return null;
    }
  },

  findInventoryItem(user, options) {
    "use strict";
    if (user && user.get('inventories')) {
      const inventory = user.get('inventories');
      return inventory
        .find(i => i.get('type') === options.type)
        .get('items')
        .find(i => ((i.get('item').get('title') === options.title) && (i.get('item_count') > 0)));
    } else {
      return null;
    }
  },

  createShareLinkIcon(isUsersPost, venalink, myParticipate) {
    "use strict";

    if (isUsersPost) {
      if (!venalink) {
        return (
          <div className="share_link_icon" >
            <i className="fa fa-link icon" />
          </div>
        )
      } else {
        return (
          <div className="share_link_icon" >
            <i className="fa fa-link icon" style={{color: '#b56f7e'}} />
          </div>
        )
      }
    } else {
      if (venalink && !myParticipate) {
        return (
          <div className="share_link_icon" >
            <i className="fa fa-unlink icon" />
          </div>
        )
      } else if (venalink && myParticipate){
        return (
          <div className="share_link_icon" >
            <i className="fa fa-unlink icon" style={{color: '#b56f7e'}}/>
          </div>
        )
      } else {
        return (
          <div className="share_link_icon" >
            <i className="fa fa-link icon"/>
          </div>
        )
      }
    }

  },

  createShareLinkMenu(isUsersPost, venalink, myParticipate) {
    "use strict";

    const {user, post} = this.props;
    const myVenalinkUrl = this.createMyVenalinkUrl(myParticipate);
    const participateItem = this.findInventoryItem(
      user, {type: 'community', title: '베나링크 참여권'}
    );

    if (isUsersPost && !venalink) {
      return (
        <div className="item">
          <h4 className="ui header">2. 베나링크를 활성화 하고 더 많은 사람들에게 알리세요!</h4>
          <div className="ui contents">
            <img className="ui floated right image small" style={{width: 50}} src="/images/venacle-item1-venalink.png" />
            RP를 사용해 베나링크를 활성화 하고 <br />많은 사람들에게 공유를 요청하세요
          </div>
          <div className="ui button primary" style={{margin: '10px 0 5px 0'}} onClick={this.toggleVenalink}>
            베나링크 활성화
          </div>
        </div>
      )
    } else if (isUsersPost && venalink) {
      return (
        <div className="item">
          <h4 className="ui header">2. 베나링크가 활성화 되었습니다</h4>
          <div className="ui contents">
            <img className="ui floated right image small" style={{width: 50}} src="/images/venacle-item1-venalink.png" />
            참여 : 10명<br />
            총 RP: {venalink.get('total_amount_r')}<br />
            지급 RP: {venalink.get('total_amount_r') - venalink.get('total_remain_r')}<br />
            남은 RP: {venalink.get('total_remain_r')}<br />
            기간 : {moment(venalink.get('terminate_at')).format('YY-MM-DD hh:mm:ss')}
          </div>
          <div className="ui button primary" style={{margin: '10px 0 5px 0'}}>
            베나링크 활성화 됨
          </div>
        </div>
      )
    } else if (!isUsersPost && venalink && !myParticipate) {
      return (
        <div className="item">
          <h4 className="ui header">2. 베나링크 참여</h4>
          <div className="ui contents">
            <img className="ui floated right image small" style={{width: 50}} src="/images/venacle-item1-venalink.png" />
            현재 베나링크 참여자 : {venalink.get('participants').size}명<br />
            남은 RP: {venalink.get('total_remain_r')}<br />
            기간 : {moment(venalink.get('terminate_at')).format('YY-MM-DD hh:mm:ss')}<br />
            <br />
            베나링크에 참여하고 RP를 보상 받으세요!
          </div>
          <div className="ui button primary" style={{margin: '10px 0 5px 0'}} onClick={this.requestParticipateVenalink.bind(this, venalink.get('id'), participateItem)}>
            베나링크 참여하기
          </div>
        </div>
      )
    } else if (!isUsersPost && venalink && myParticipate) {
      return (
        <div className="item">
          <h4 className="ui header">베나링크를 복사하고 공유하세요</h4>
          <div className="ui action input link" style={{paddingBottom: 10}}>
            <input ref={'venalink_' + post.get('id')} type="text" readOnly="readonly" value={myVenalinkUrl} />
            <button className="ui primary right labeled icon button" onClick={this.copyLink.bind(this, 'venalink_' + post.get('id'))}>
              <i className="copy icon" />
              복사
            </button>
          </div>
          <div className="ui contents">
            <img className="ui floated right image small" style={{width: 50}} src="/images/venacle-item1-venalink.png" />
            현재 베나링크 참여자 : {venalink.get('participants').size}명<br />
            남은 RP: {venalink.get('total_remain_r')}<br />
            기간 : {moment(venalink.get('terminate_at')).format('YY-MM-DD hh:mm:ss')}<br />
            <br />
            순방문자 1명당 5 RP씩 보상해 받습니다.<br />
            활성화 기간이 끝나면 보상받은 RP를 지급받게 됩니다.
          </div>
          <div className="ui button primary" style={{margin: '10px 0 5px 0'}}>
            예상 지급 RP: {myParticipate.get('paid_r')}
          </div>
        </div>
      )
    }

  },

  render() {
    const {userId, author, post, user} = this.props;

    const linkUrl = this.createShareLink(post.get('link_id'));
    const venalink = this.isActivateVenalinkPost(post);
    const isUsersPost = this.isUsersPost(author, userId);
    const myParticipate = this.isParticipateVenalink(venalink);


    const activateItem = this.findInventoryItem(
      user, {type: 'community', title: '베나링크 활성화'}
    );

    const shareLinkIcon = this.createShareLinkIcon(isUsersPost, venalink, myParticipate);
    const shareLinkMenu = this.createShareLinkMenu(isUsersPost, venalink, myParticipate);

    return (
      <div>
      <Dropdown>
        <DropdownTrigger>
          {shareLinkIcon}
        </DropdownTrigger>
        <DropdownContent>
          <div className="ui dropdown share_link_dropdown">
            <div className="ui menu transition visible" tabIndex="-1">
              <div className="item">
                <h4 className="ui header">1. 링크를 복사하고 공유하세요</h4>
                <div className="ui action input link">
                  <input ref={'sharelink' + post.get('id')} type="text" readOnly="readonly" value={linkUrl} />
                  <button className="ui primary right labeled icon button" onClick={this.copyLink.bind(this, 'sharelink' + post.get('id'))}>
                    <i className="copy icon" />
                    복사
                  </button>
                </div>
              </div>

              {shareLinkMenu}

            </div>
          </div>
        </DropdownContent>
      </Dropdown>
        <Modal
          overlayClassName={'activate-modal report-modal md-overlay'}
          isOpen={this.state.openVenalink}
          closeTimeoutMS={300}
          style={{
            content : {
              position                   : 'absolute',
              top                        : '35%',
              left                       : '35%',
              bottom: null,
              right: null,
              border                     : '1px solid #ccc',
              background                 : '#fff',
              overflow                   : 'auto',
              WebkitOverflowScrolling    : 'touch',
              borderRadius               : '4px',
              outline                    : 'none',
              padding                    : '20px',
              width: 450
            }
          }}
          onAfterOpen={this.stopBeforeEvent}
          onRequestClose={this.toggleVenalink}

        >
          베나링크
          <div className="ui items">
            <div className="item">
              <a className="ui tiny image">
                <img src="/images/venacle-item1-venalink.png" />
              </a>
              {
                activateItem &&
                <div className="middle aligned content">
                  <div className="header">
                    베나링크 활성화
                  </div>
                  <div className="description">
                    <form className="ui form">
                      <div className="field">
                        <label>
                          예산 RP
                          <div className="ui button tiny" style={{width: 40, height: 21, padding: 5, marginLeft: 10}}>충전</div>
                        </label>
                        <div className="ui right labeled input">
                          <InputNumber
                            step={100}
                            min={0}
                            max={user.get('trendbox').get('R')}
                            onChange={this.checkMaxRP}
                            type="text"
                          />
                          <div className="ui basic label">
                            RP
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label>활성화 기간</label>
                        <div className="ui input">

                          <DatePicker
                            selected={this.state.startDate}
                            dateFormat="YYYY-MM-DD"
                            onChange={this.handleChangeDate}
                            minDate={moment().add(1, "days")}
                            maxDate={moment().add(1, "month")}
                            placeholderText="기한을 입력하세요" />
                        </div>
                      </div>
                      <div className="field">
                        <div>
                          RP : {user.get('trendbox').get('R')} => {user.get('trendbox').get('R') - this.state.venalinkRP}
                        </div>
                      </div>
                      <div className="ui button primary" onClick={this.requestActivateVenalink.bind(this, activateItem)}>활성화</div>
                    </form>
                  </div>
                </div>
              }
              {
                !activateItem &&
                <div className="middle aligned content">
                  <div className="header">
                    현재 인벤토리에 사용가능한 베나링크 활성화 아이템이 없습니다
                  </div>
                  <div className="extra">
                    <div className="ui label">베나링크 활성화 구입하기 (50 TP)</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </Modal>
      </div>
    );
  }
});

export default LinkMenu;
