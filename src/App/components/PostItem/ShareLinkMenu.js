/**
 * Created by dobyeongsu on 2016. 10. 26..
 */
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import moment from '../../Lib/MomentLib';

import './LinkMenu.scss';

class ShareLinkMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openVenalink: false,
      venalinkRP: '',
      startDate: moment().add(1, 'days'),
    };

    this.checkMaxRP = this.checkMaxRP.bind(this);
    this.requestActivateVenalink = this.requestActivateVenalink.bind(this);
    this.copyLink = this.copyLink.bind(this);
    this.toggleVenalink = this.toggleVenalink.bind(this);
    this.requestParticipateVenalink = this.requestParticipateVenalink.bind(this);
    this.isUsersPost = this.isUsersPost.bind(this);
    this.isActivateVenalinkPost = this.isActivateVenalinkPost.bind(this);
    this.isParticipateVenalink = this.isParticipateVenalink.bind(this);
    this.createShareLink = this.createShareLink.bind(this);
    this.createMyVenalinkUrl = this.createMyVenalinkUrl.bind(this);
    this.findInventoryItem = this.findInventoryItem.bind(this);
    this.createShareLinkIcon = this.createShareLinkIcon.bind(this);
    this.createShareLinkMenu = this.createShareLinkMenu.bind(this);
  }

  checkMaxRP(v) {
    const { user } = this.props;
    const maxRP = user.get('trendbox').get('R');

    if (v <= maxRP) {
      this.setState({
        venalinkRP: v,
        venalinkRPCheck: true,
      });
    }
  }

  requestActivateVenalink(activateItem) {
    if (activateItem) {
      const item = activateItem.get('item');
      const { post } = this.props;

      this.setState({
        openVenalink: false,
      });

      if (this.state.venalinkRP > 1000) {
        this.props.FireRequestActivateVenalink({
          total_amount_r: this.state.venalinkRP,
          terminate_at: this.state.startDate,
          post_id: post.get('id'),
          activate_item_id: item.get('id'),
          active_at: new Date(),
        });
      }
    }
  }

  copyLink(refId) {
    this.refs[refId].select();
    document.execCommand('copy');
  }

  toggleVenalink() {

    this.props.FireToggleActiveVenalinkModal({
      contentType: 'ActivateVenalink',
      venalinkActivateRequestPostId: this.props.post.get('id'),
    });
  }

  requestParticipateVenalink(venalinkId, participateItem, postId) {
    if (participateItem) {

      this.setState({
        openVenalink: false,
      });

      if (venalinkId) {
        this.props.FireRequestParticipateVenalink({
          postId,
          venalink_id: venalinkId,
          used_venalink_item_id: participateItem.get('id'),
          request_at: new Date(),
        });
      }
    }
  }

  isUsersPost(author, userId) {

    return userId === author.get('id');
  }

  isActivateVenalinkPost(post) {

    if (post.get('venalinks') && post.get('venalinks').size > 0) {
      return post.get('venalinks').find(i => i.get('is_activate') === true);
    } else {
      return false;
    }
  }

  isParticipateVenalink(venalink) {

    const { userId } = this.props;

    if (venalink) {
      if (venalink.get('participants')) {
        return venalink.get('participants')
          .find(i => i.get('user_id') === userId);
      }
    }

    return false;
  }

  createShareLink(linkId) {
    if (process.env.NODE_ENV === 'production') {
      return `http://venacle.com/link/post/m/${linkId}`;
    } else {
      return `http://localhost:3000/link/post/m/${linkId}`;
    }
  }

  createMyVenalinkUrl(myParticipate) {

    if (myParticipate) {
      if (process.env.NODE_ENV === 'production') {
        return `http://venacle.com/venalink/post/m/${myParticipate.get(
          'venalink_uid')}`;
      } else {
        return `http://localhost:3000/venalink/post/m/${myParticipate.get(
          'venalink_uid')}`;
      }
    } else {
      return null;
    }
  }

  findInventoryItem(user, options) {
    const { Items, Venatems } = this.props;

    if (user && user.get('inventories')) {
      const findItem = Items.find(i => i.get('title') === options.title);

      if (findItem) {
        const findVenatem = Venatems.find(
          v => v.get('item_id') === findItem.get('id'));

        if (findVenatem) {

          if (findVenatem.get('item_count') > 0) {
            return findItem;
          }
        }
      }
    }

    return null;
  }

  createShareLinkIcon(isUsersPost, venalink, myParticipate) {

    if (isUsersPost) {
      if (!venalink) {
        return (
          <div className="share_link_icon">
            <i className="fa fa-link"/>
          </div>
        );
      } else {
        return (
          <div className="share_link_icon">
            <i className="fa fa-link" style={{ color: '#b56f7e' }}/>
          </div>
        );
      }
    } else {
      if (venalink && !myParticipate) {
        return (
          <div className="share_link_icon">
            <i className="fa fa-unlink"/>
          </div>
        );
      } else if (venalink && myParticipate) {
        return (
          <div className="share_link_icon">
            <i className="fa fa-unlink" style={{ color: '#b56f7e' }}/>
          </div>
        );
      } else {
        return (
          <div className="share_link_icon">
            <i className="fa fa-link"/>
          </div>
        );
      }
    }
  }

  createShareLinkMenu(isUsersPost, venalink, myParticipate) {

    const { user, post } = this.props;
    const myVenalinkUrl = this.createMyVenalinkUrl(myParticipate);
    const participateItem = this.findInventoryItem(
      user, { type: 'community', title: '베나링크 참여권' }
    );

    if (isUsersPost && !venalink) {
      return (
        <div className="item">
          <h4 className="ui header">베나링크를 활성화 하고 더 많은 사람들에게 알리세요!</h4>
          <div className="ui contents">
            <img className="ui floated right image small" style={{ width: 50 }}
                 src="/images/venacle-item1-open-vlink.png"/>
            RP를 사용해 베나링크를 활성화 하고 <br/>많은 사람들에게 공유를 요청하세요
          </div>
          <div className="ui button primary" style={{ margin: '10px 0 5px 0' }}
               onClick={this.toggleVenalink}>
            베나링크 활성화
          </div>
        </div>
      );
    } else {
      let participants

      if (isUsersPost && venalink) {

         participants = venalink.get('participants') && venalink.get('participants').size || '0';

        return (
          <div className="item">
            <h4 className="ui header">2. 베나링크가 활성화 되었습니다</h4>
            <div className="ui contents">
              <img className="ui floated right image small" style={{ width: 50 }}
                   src="/images/venacle-item1-open-vlink.png"/>
              참여 : {participants}명<br/>
              총 RP: {venalink.get('total_amount_r')}<br/>
              지급 RP: {venalink.get('total_amount_r') -
            venalink.get('total_remain_r')}<br/>
              남은 RP: {venalink.get('total_remain_r')}<br/>
              기간 : {moment(venalink.get('terminate_at'))
              .format('YY-MM-DD HH:mm:ss')}
            </div>
            <div className="ui button primary" style={{ margin: '10px 0 5px 0' }}>
              베나링크 활성화 됨
            </div>
          </div>
        );
      } else if (!isUsersPost && venalink && !myParticipate) {

        participants = venalink.get('participants') && venalink.get('participants').size || '0';

        return (
          <div className="item">
            <h4 className="ui header">2. 베나링크 참여</h4>
            <div className="ui contents">
              <img className="ui floated right image small" style={{ width: 50 }}
                   src="/images/venacle-item1-open-vlink.png"/>
              현재 베나링크 참여자 : {participants}명<br/>
              남은 RP: {venalink.get('total_remain_r')}<br/>
              기간 : {moment(venalink.get('terminate_at'))
              .format('YY-MM-DD HH:mm:ss')}<br/>
              <br/>
              베나링크에 참여하고 RP를 보상 받으세요!
            </div>
            <div className="ui button primary" style={{ margin: '10px 0 5px 0' }}
                 onClick={this.requestParticipateVenalink.bind(this,
                   venalink.get('id'), participateItem, post.get('id'))}>
              베나링크 참여하기
            </div>
          </div>
        );
      } else if (!isUsersPost && venalink && myParticipate) {

        participants = venalink.get('participants') && venalink.get('participants').size || '0';

        return (
          <div className="item">
            <h4 className="ui header">베나링크를 복사하고 공유하세요</h4>
            <div className="ui action input link" style={{ paddingBottom: 10 }}>
              <input ref={'venalink_' + post.get('id')} type="text"
                     readOnly="readonly" value={myVenalinkUrl}/>
              <button className="ui primary right labeled icon button"
                      onClick={this.copyLink.bind(this,
                        'venalink_' + post.get('id'))}>
                <i className="copy icon"/>
                복사
              </button>
            </div>
            <div className="ui contents">
              <img className="ui floated right image small" style={{ width: 50 }}
                   src="/images/venacle-item1-open-vlink.png"/>
              현재 베나링크 참여자 : {participants}명<br/>
              남은 RP: {venalink.get('total_remain_r')}<br/>
              기간 : {moment(venalink.get('terminate_at'))
              .format('YY-MM-DD HH:mm:ss')}<br/>
              <br/>
              순방문자 1명당 5 RP씩 보상해 받습니다.<br/>
              활성화 기간이 끝나면 보상받은 RP를 지급받게 됩니다.
            </div>
            <div className="ui button primary" style={{ margin: '10px 0 5px 0' }}>
              예상 지급 RP: {myParticipate.get('paid_r')}
            </div>
          </div>
        );
      }
    }

  }

  render() {
    const { userId, author, post } = this.props;

    const linkUrl = this.createShareLink(post.get('link_id'));
    const venalink = this.isActivateVenalinkPost(post);
    const isUsersPost = this.isUsersPost(author, userId);
    const myParticipate = this.isParticipateVenalink(venalink);

    const shareLinkIcon = this.createShareLinkIcon(isUsersPost, venalink,
      myParticipate);
    const shareLinkMenu = this.createShareLinkMenu(isUsersPost, venalink,
      myParticipate);

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
                  <h4 className="ui header">링크를 복사하고 공유하세요</h4>
                  <div>
                    보상 : <span>주소 방문자당 5TP</span>
                  </div>
                  <div className="ui action input link" style={{ marginTop: 10 }}>
                    <input ref={'sharelink' + post.get('id')} type="text"
                           readOnly="readonly" value={linkUrl}/>
                    <button className="ui primary right labeled icon button"
                            onClick={this.copyLink.bind(this,
                              'sharelink' + post.get('id'))}>
                      <i className="copy icon"/>
                      복사
                    </button>
                  </div>
                </div>

                {shareLinkMenu}

              </div>
            </div>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  }
}

ShareLinkMenu.propTypes = {
  userId: PropTypes.number,
  author: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
  Venatems: PropTypes.object.isRequired,
  Items: PropTypes.object.isRequired,
  FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
  FireRequestActivateVenalink: PropTypes.func.isRequired,
  FireRequestParticipateVenalink: PropTypes.func.isRequired,
};

export default ShareLinkMenu;
