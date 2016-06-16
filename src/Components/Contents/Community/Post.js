import React from 'react';
import ReactTooltip from 'react-tooltip';
import {Link, browserHistory} from 'react-router';
import CommunityActions from '../../../Actions/CommunityActions';
import LoginActions from '../../../Actions/LoginActions';
import ReportActions from '../../../Actions/ReportActions';

require('./Post.scss');
const Post = React.createClass({
  displayName: 'Post',

  sendLike() {
    "use strict";

    const {LoginStore, post: IPost} = this.props;
    const postId = IPost.get('result').toString();
    const modalFlag = LoginStore.get('openLoginModal');
    const isLogin = LoginStore.get('isLogin');
    if (!isLogin) {
      LoginActions.toggleLoginModal(modalFlag, '/');
    } else {
      CommunityActions.likePost(postId);
    }
  },

  componentWillUnmount() {
    "use strict";

    $(this.refs.report_icon).dropdown('destroy');
    CommunityActions.resetData();
  },

  _onSelectOptionHandler(value, text, $selectedItem) {
    "use strict";

    const action = $selectedItem.data('action');

    switch (action) {
      case 'report':
        const IPost = this.props.post;
        const postId = IPost.get('result').toString();
        const post = IPost.getIn(['entities', 'posts', postId]);

        console.log('포스트 신고 Id : ', value);
        const reportObj = {
          type: 'post',
          typeId: value,
          content: post
        };
        ReportActions.openReportModal(reportObj);
        break;
      case 'report_ad':

        console.log('포스트 광고 신고 Id : ', value);
        break;
      case 'delete_post':

        console.log('포스트 삭제 Id : ', value);
        break;
      default:
        break;
    }
  },
  componentDidMount() {
    const self = this;

    $(this.refs.report_icon).dropdown({
      onChange: self._onSelectOptionHandler
    });
  },

  componentDidUpdate() {
    "use strict";
    const self = this;

    $(this.refs.report_icon).dropdown({
      onChange: self._onSelectOptionHandler
    });
  },

  render() {
    const {LoginStore, UserStore} = this.props;
    const isLogin = LoginStore.get('isLogin');

    let userId;
    if (isLogin) {
      userId = UserStore.getIn(['user', 'id']);
    }

    const IPost = this.props.post;
    const postId = IPost.get('result').toString();
    const post = IPost.getIn(['entities', 'posts', postId]);
    const author = IPost.getIn(['entities', 'author', post.get('author').toString()]);
    const authorInfo = {
      author: author,
      trendbox: author.get('trendbox')
    };
    const styleClass = this.props.styleClass;
    const sex = author.getIn(['profile', 'sex']),
      avatar_img = author.getIn(['profile', 'avatar_img']),
      icon_img = author.getIn(['icon', 0, 'iconDef', 'icon_img']);
    let avatarImg, iconImg;

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

    return (
      <div key={post.get('id')} className={"ui item " + styleClass}>
        {/* avatar */}
        <div className="ui image tiny">
          { avatarImg }
        </div>

        {/* meta */}
        <div className="ui content">
          <h3 className="best_post_title"><a>{post.get('title')}</a></h3>
          <div className="meta best_post_meta">
            <div className="ui horizontal divided list">
              <div className="item">
                <a>{post.getIn(['forum', 'category', 'category_group', 'club', 'title'])}</a>
              </div>
              <div className="item">
                <a>{post.getIn(['forum', 'category', 'title'])}</a>
              </div>
              <div className="item">
                <a>{post.getIn(['forum', 'title'])}</a>
              </div>
            </div>
          </div>
          <div className="meta best_post_meta">
            <div className="author_nick">
              <a data-tip
                 data-for="nick"
                 data-offset="{'bottom': 8, 'right': 42}"
              >
                {author.get('nick')}
              </a>
              <ReactTooltip
                id='nick'
                place="right"
                class="abc"
                effect="solid"
              >
                <div id="trend_box" className="widget">
                  <div id="widget_user_info">
                    <div className="ui items">
                      <div className="ui item">

                        <a id="user_avatar_img" className="ui mini image" onClick={this.openAvatarModal}>
                          { avatarImg }
                        </a>

                        <div className="content">
                          <div className="user_info_header">
                            <span className="ui description">{authorInfo.author.get('nick')}</span>
                            {iconImg}
                          </div>
                          <div className="description">

                            <div className="item" >
                              <span className="item_col">레벨</span>
                              <div className="item_num">
                                <span>{authorInfo.trendbox.get('level')}</span>
                              </div>
                            </div>

                            <div className="item">
                              <span className="item_col">명성</span>
                              <div className="item_num">
                                <span>{authorInfo.trendbox.get('reputation')}</span>
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
              {iconImg}
            </div>
          </div>
          <div className="meta best_post_meta">
            <div className="ui horizontal divided list">
              <div className="item">
                {post.get('created_at')}
              </div>
              <div className="item">
                조회 {new Intl.NumberFormat().format(post.get('view_count'))}
              </div>
            </div>
          </div>

          {/* content */}
          <div className="ui description best_post_content" dangerouslySetInnerHTML={{ __html: post.get('content') }}></div>

          {/* <TagList items={Tags} /> */}

          {/* buttons */}
          <div className="ui extra best_post_buttons">
            <div className="like_box">
              <div className={'like_icon ' + (post.get('liked') ? 'active' : '')} onClick={this.sendLike}>
                <i className={'heart ' + (post.get('liked')? '' : 'outline') + ' icon'} />
              </div>
              <a className="like_count">{post.get('like_count')}</a>
            </div>
            <div className="comment_box">
              <div className="comment_icon">
                <i className="edit outline icon"></i>
              </div>
              <a className="comment_count">{post.get('comment_count')}</a>
            </div>
            <div className="report_box">
              <div ref="report_icon" className="ui icon dropdown report_icon">
                <i className="warning outline icon"></i>
                <div className="menu">
                  <div className="item" data-value={post.get('id')} data-action="report">신고</div>
                  {/* <div className="item " data-value={post.get('id')} data-action="report_ad">광고 신고</div> */}
                  {
                    userId && (userId === author.get('id')) &&
                    <div className="item " data-value={post.get('id')} data-action="delete_post">삭제하기</div>
                  }
                </div>
              </div>
            </div>
          </div>
          {/* Comments */}
        </div>
      </div>
    );
  }
});

export default Post;