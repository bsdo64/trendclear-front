import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import AvatarImage from '../AvatarImage';
import AdPost1 from '../Ad/AdPost1';

import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

import LoginActions from '../../Actions/LoginActions';
import ListActions from '../../Actions/ListActions';
import CommunityActions from '../../Actions/CommunityActions';

import Menu from './ReportMenu';

require('./Post.scss');
const BigPost = React.createClass({
  mixins: [PureRenderMixin],
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

    const linkUrl = `http://venacle.com/link/post/m/${post.get('link_id')}`;

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
                  <div className="ui dropdown">
                    <div className="ui menu transition visible" tabIndex="-1">
                      <p className="share_link_info">
                        링크를 복사하고 공유하세요!
                      </p>
                      <div className="ui action input">
                        <input ref={post.get('id')} type="text" readOnly="readonly" value={linkUrl} />
                          <button className="ui primary right labeled icon button" onClick={this.copyLink.bind(this, post.get('id'))}>
                            <i className="copy icon"></i>
                            복사
                          </button>
                      </div>
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
          {/* Comments */}
        </div>
      </div>
    )
  }
});

export default BigPost;