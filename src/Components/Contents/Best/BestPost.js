import React from 'react';
import {Link, browserHistory} from 'react-router';
import CommunityActions from '../../../Actions/CommunityActions';
import LoginActions from '../../../Actions/LoginActions';
import ReactTooltip from 'react-tooltip';
import Perf from 'react-addons-perf';

require('./BestPost.scss');
const BestPost = React.createClass({
  getInitialState() {
    return {
      open: false
    };
  },

  show() {
    "use strict";

    this.setState({open: true})
  },

  close() {
    "use strict";

    this.setState({open: false})
  },

  sendLike() {
    "use strict";

    const {LoginStore} = this.props;
    const modalFlag = LoginStore.get('openLoginModal');
    const isLogin = LoginStore.get('isLogin');
    if (!isLogin) {
      LoginActions.toggleLoginModal(modalFlag, '/');
    } else {
      CommunityActions.likePost(this.props.postId);
    }
  },
  render() {
    
    const {postList, postId, LoginStore, UserStore} = this.props;
    const isLogin = LoginStore.get('isLogin');
    let userId;
    if (isLogin) {
      userId = UserStore.getIn(['user', 'id'])
    }
    
    const post = postList ? postList.getIn(['entities', 'posts', postId.toString()]) : null;
    const author = postList ? postList.getIn(['entities', 'author', post.get('author').toString()]) : null;
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

    const categoryId = post.getIn(['forum', 'category', 'id']);
    const forumId = post.getIn(['forum', 'id']);
    const forumUrl = `/community?categoryId=${categoryId}&forumId=${forumId}`;
    const postUrl = `/community?categoryId=${categoryId}&forumId=${forumId}&postId=${postId}`;

    return (
      <div key={post.get('id')} className={"ui item " + styleClass}
           onMouseEnter={this.show}
           onMouseLeave={this.close}
      >
        {/* avatar */}
        <div className="ui image tiny">
          { avatarImg }
        </div>

        {/* meta */}
        <div className="ui content">
          <h3 className="best_post_title"><Link to={postUrl}>{post.get('title')}</Link></h3>
          <div className="meta best_post_meta">
            <div className="ui horizontal divided list">
              <div className="item">
                <a >{post.getIn(['forum', 'category', 'category_group', 'club', 'title'])}</a>
              </div>
              <div className="item">
                <a >{post.getIn(['forum', 'category', 'title'])}</a>
              </div>
              <div className="item">
                <Link to={forumUrl}>{post.getIn(['forum', 'title'])}</Link>
              </div>
            </div>
          </div>
          <div className="meta best_post_meta">
            <div className="author_nick">
              <a data-tip
                 data-for={'nick_' + author.get('nick')}
                 data-offset="{'bottom': 8, 'right': 42}"
              >
                {author.get('nick')}
              </a>

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
                조회 {post.get('view_count')}
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
                <Link to={postUrl + '#comment_box'}>
                  <i className="edit outline icon"></i>
                </Link>
              </div>
              <a className="comment_count">{post.get('comment_count')}</a>
            </div>
            <div className="report_box">
              <div className={'ui icon dropdown report_icon ' + (this.state.open? '': 'none')}>
                <i className="warning outline icon"></i>
                <div className="menu">
                  <div className="item" data-value={post.get('id')} data-action="report">신고</div>
                  <div className="item " data-value={post.get('id')} data-action="report_ad">광고 신고</div>
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

export default BestPost;