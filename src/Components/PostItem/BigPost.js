import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import AvatarImage from '../AvatarImage';
import AdPost1 from '../Ad/AdPost1';
import Modal from 'react-modal';
import InputNumber from 'rc-input-number';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

import LoginActions from '../../Actions/LoginActions';
import ListActions from '../../Actions/ListActions';
import CommunityActions from '../../Actions/CommunityActions';
import VenaStoreActions from '../../Actions/VenaStoreActions';

import Menu from './ReportMenu';

require('./Post.scss');

const BigPost = React.createClass({
  getInitialState() {
    return {
      openVenalink: false,
      venalinkRP: '',
      startDate: moment()
    };
  },

  componentDidMount() {
    this.postItem.addEventListener('click', this.setScroll);
  },

  componentWillUnmount() {
    this.postItem.removeEventListener('click', this.setScroll)
  },

  setScroll() {
    "use strict";

    const currentScroll = document.body.scrollTop;

    ListActions.setScroll({
      scrollHeight: currentScroll
    });
  },

  sendLike() {
    "use strict";

    const {post, user, loginModalFlag} = this.props;
    if (!user) {
      LoginActions.toggleLoginModal(loginModalFlag, '/');
    } else {
      CommunityActions.likePost(post.get('id'));
    }
  },

  createIconImg(iconImg) {
    if (iconImg) {
      return <img id="user_icon_img" src={'/images/' + iconImg}/>;
    }
  },

  copyLink(postId) {
    "use strict";
    this.refs[postId].select();
    const successful = document.execCommand('copy');
  },

  toggleVenalink() {
    "use strict";

    this.setState({openVenalink: !this.state.openVenalink})
  },

  initStore() {
    "use strict";


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

  requestActivateVenalink() {
    "use strict";
    const {post, user} = this.props;
    const activateItem = user
      .get('inventories')
      .find(i => i.get('type') === 'community')
      .get('items')
      .find(i => i.get('item').get('title') === '베나링크 활성화')
      .get('item');

    VenaStoreActions.requestActivateVenalink({
      total_amount_r: this.state.venalinkRP,
      terminate_at: this.state.startDate,
      post_id: post.get('id'),
      activate_item_id: activateItem.get('id'),
      active_at: new Date()
    })
  },

  render() {
    "use strict";
    const {post, author, user, view, postStyle, shorten} = this.props;

    const userId = user && user.get('id');
    const sex = author.getIn(['profile', 'sex']),
      avatar_img = author.getIn(['profile', 'avatar_img']),
      icon_img = author.getIn(['icon', 0, 'iconDef', 'icon_img']);

    const forumId = post.get('forum_id');
    const postId = post.get('id');
    const forumUrl = `/community?forumId=${forumId}`;
    const postUrl = `/community?forumId=${forumId}&postId=${postId}`;
    const liked = post.get('liked');

    const cPost = cx('ui item best_list_item', {
      post_item: (postStyle === 'post_item')
    });

    const isLong = (post.get('height') > 0) && (post.get('height') > 1000);
    const contentStyle = cx('ui description best_post_content', {
      shorten_post: isLong
    });

    let linkUrl;
    if (process.env.NODE_ENV === 'production') {
      linkUrl = `http://venacle.com/link/post/m/${post.get('link_id')}`;
    } else {
      linkUrl = `http://localhost:3000/link/post/m/${post.get('link_id')}`;
    }


    return (
      <div ref={(ref) => this.postItem = ref}
           key={post.get('id')}
           className={cPost}
      >
        {/* avatar */}
        <div className="ui image tiny">
          <AvatarImage
            sex={sex}
            avatarImg={avatar_img}
          />
        </div>

        {/* meta */}
        <div className="ui content">
          {/* forum */}
          <div className="meta best_post_meta">
            <div className="ui horizontal divided list">
              <div className="item">
                <Link to={forumUrl}>{post.getIn(['forum', 'title'])}</Link>
              </div>
            </div>
          </div>

          {/* title */}
          <h3 className="best_post_title"><Link to={postUrl}>{post.get('title')}</Link></h3>

          {/* nick, date, view */}
          <div className="meta best_post_meta">
            <div className="ui horizontal divided list">
              <div className="item">
                <div className="author_nick">
                  <a data-tip
                     data-for={'nick_' + author.get('nick') + '_' + post.get('id')}
                     data-offset="{'bottom': 8, 'right': 42}"
                  >
                    {author.get('nick')}
                  </a>
                  <ReactTooltip
                    id={'nick_' + author.get('nick') + '_' + post.get('id')}
                    place="right"
                    class="abc"
                    effect="solid"
                  >
                    <div id="trend_box" className="widget">
                      <div id="widget_user_info">
                        <div className="ui items">
                          <div className="ui item">

                            <a id="user_avatar_img" className="ui mini image" >
                              <AvatarImage
                                sex={sex}
                                avatarImg={avatar_img}
                              />
                            </a>

                            <div className="content">
                              <div className="user_info_header">
                                <span className="ui description">{author.get('nick')}</span>
                                {this.createIconImg(icon_img)}
                              </div>
                              <div className="description">

                                <div className="item" >
                                  <span className="item_col">레벨</span>
                                  <div className="item_num">
                                    <span>{author.getIn(['trendbox', 'level'])}</span>
                                  </div>
                                </div>

                                <div className="item">
                                  <span className="item_col">명성</span>
                                  <div className="item_num">
                                    <span>{author.getIn(['trendbox', 'reputation'])}</span>
                                  </div>
                                </div>

                                <div className="item">
                                  <span className="item_col">랭크</span>
                                  <div className="item_num">
                                    <span></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ReactTooltip>
                </div>
                <div className="author_icon">
                  {this.createIconImg(icon_img)}
                </div>
              </div>
              <div className="item">
                {post.get('created_at')}
              </div>
              {
                view === true &&
                <div className="item">
                  조회 {post.get('view_count')}
                </div>
              }
            </div>
          </div>

          {/* post Ad*/}
          {/*
            (postStyle === 'post_item') &&
            <AdPost1 url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXpJWqQSSZ2s4-aw-miw-Q9spL7qCJ7rjOLav-VQpNpbdK5po" />
          */}

          {/* content */}
          <div className={contentStyle} dangerouslySetInnerHTML={{ __html: post.get('content') }}></div>

          {/* isLong */}
          {
            isLong && shorten &&
            <div className="more_long_post">
              <div className="more_long_post_button">
                <Link to={postUrl} target="_blank">
                  <i className="fa fa-external-link" />
                </Link>
                <Link to={postUrl}>
                  {' 더 보기'}
                </Link>
              </div>
            </div>
          }

          {/* <TagList items={Tags} /> */}

          {/* buttons */}
          <div className="ui extra best_post_buttons">
            <div className="like_box">
              <div className={'like_icon ' + (liked ? 'active' : '')} onClick={this.sendLike}>
                <i className={'heart ' + (liked? '' : 'outline') + ' icon'} />
              </div>
              <a className="like_count">{post.get('like_count')}</a>
            </div>
            <div className="comment_box">
              <div className="comment_icon">
                <Link to={postUrl + '#comment_box'}>
                  <i className="edit outline icon"></i>
                </Link>
              </div>
              <a className="comment_count">{post.get('comment_count')}</a>
            </div>
            <div className="share_link_box">
              <Dropdown>
                <DropdownTrigger>
                  <div className="share_link_icon" >
                    <i className="fa fa-link icon"></i>
                  </div>
                </DropdownTrigger>
                <DropdownContent>
                  <div className="ui dropdown share_link_dropdown">
                    <div className="ui menu transition visible" tabIndex="-1">
                      <div className="item">
                        <h4 className="ui header">1. 링크를 복사하고 공유하세요</h4>
                        <div className="ui action input link">
                          <input ref={post.get('id')} type="text" readOnly="readonly" value={linkUrl} />
                          <button className="ui primary right labeled icon button" onClick={this.copyLink.bind(this, post.get('id'))}>
                            <i className="copy icon"></i>
                            복사
                          </button>
                        </div>
                      </div>
                      {
                        userId === author.get('id') &&
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
                      }
                      {
                        userId === author.get('id') &&
                        <div className="item">
                          <h4 className="ui header">2. 베나링크를 활성화 하고 더 많은 사람들에게 알리세요!</h4>
                          <div className="ui contents">
                            <img className="ui floated right image small" style={{width: 50}} src="/images/venacle-item1-venalink.png" />
                            베나링크 참여자 : 10명<br />총 RP: 1500<br />지급 RP: 200<br />남은 RP: 1300<br />기간 : 2016-2-3 12:34
                          </div>
                          <div className="ui button primary" style={{margin: '10px 0 5px 0'}}>
                            베나링크 활성화 됨
                          </div>
                        </div>
                      }
                      {
                        userId !== author.get('id') &&
                        <div className="item">
                          <h4 className="ui header">2. 베나링크 활성화</h4>
                          <div className="ui contents">
                            <img className="ui floated right image small" style={{width: 50}} src="/images/venacle-item1-venalink.png" />
                            현재 베나링크 참여자 : 10명<br />남은 RP: 1300<br />기간 : 2016-2-3 12:34<br /><br />
                            베나링크에 참여하고 RP를 보상 받으세요!
                          </div>
                          <div className="ui button primary" style={{margin: '10px 0 5px 0'}}>
                            베나링크 참여하기
                          </div>
                        </div>
                      }
                      {
                        userId !== author.get('id') &&
                        <div className="item">
                          <h4 className="ui header">2. 베나링크 활성화</h4>
                          <div className="ui contents">
                            <img className="ui floated right image small" style={{width: 50}} src="/images/venacle-item1-venalink.png" />
                            현재 베나링크 참여자 : 10명<br />남은 RP: 1300<br />기간 : 2016-2-3 12:34<br /><br />
                            순방문자 1명당 5 RP씩 보상해 받습니다.<br />
                            활성화 기간이 끝나면 보상받은 RP를 지급받게 됩니다.
                          </div>
                          <div className="ui button primary" style={{margin: '10px 0 5px 0'}}>
                            예상 지급 RP: 200<br />
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </DropdownContent>
              </Dropdown>
            </div>
            {
              userId &&
              <div className="report_box">
                <Menu
                  targetType="post"
                  forumId={post.get('forum_id')}
                  targetId={post.get('id')}
                  isUser={userId && (userId === author.get('id'))}
                />
              </div>
            }
          </div>
          <Modal
            overlayClassName={'report-modal md-overlay'}
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
            onAfterOpen={this.initStore}
            onRequestClose={this.toggleVenalink}
          >
            베나링크
            <div className="ui items">
              <div className="item">
                <a className="ui tiny image">
                  <img src="/images/venacle-item1-venalink.png" />
                </a>
                {
                  user && user.get('inventories') && user.get('inventories').find(i => i.get('type') === 'community').get('items').find(i => i.get('item').get('title') === '베나링크 활성화') &&
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
                              minDate={moment()}
                              placeholderText="기한을 입력하세요" />
                          </div>
                        </div>
                        <div className="field">
                          <div>
                            RP : {user.get('trendbox').get('R')} => {user.get('trendbox').get('R') - this.state.venalinkRP}
                          </div>
                        </div>
                        <div className="ui button primary" onClick={this.requestActivateVenalink}>활성화</div>
                      </form>
                    </div>
                  </div>
                }
                {
                  user && user.get('inventories') && !user.get('inventories').find(i => i.get('type') === 'community').get('items').find(i => i.get('item').get('title') === '베나링크 활성화') &&
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
      </div>
    )
  }
});

export default BigPost;