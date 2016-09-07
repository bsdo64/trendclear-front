import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import AvatarImage from '../AvatarImage';

import LoginActions from '../../Actions/LoginActions';
import CommunityActions from '../../Actions/CommunityActions';

import Menu from './ReportMenu';

require('./Post.scss');
const BigPost = React.createClass({
  mixins: [PureRenderMixin],

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

  render() {
    "use strict";
    const {post, author, user, view} = this.props;

    const userId = user && user.get('id');
    const sex = author.getIn(['profile', 'sex']),
      avatar_img = author.getIn(['profile', 'avatar_img']),
      icon_img = author.getIn(['icon', 0, 'iconDef', 'icon_img']);

    const forumId = post.get('forum_id');
    const postId = post.get('id');
    const forumUrl = `/community?forumId=${forumId}`;
    const postUrl = `/community?forumId=${forumId}&postId=${postId}`;
    const liked = post.get('liked');

    const postStyle = cx('ui item best_list_item', {
      post_item: (this.props.postStyle === 'post_item')
    });

    return (
      <div key={post.get('id')} className={postStyle}>
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

          {/* content */}
          <div className="ui description best_post_content" dangerouslySetInnerHTML={{ __html: post.get('content') }}></div>

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