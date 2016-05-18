import React from 'react';
import {Link, browserHistory} from 'react-router';
import CommunityActions from '../../../Actions/CommunityActions';
import LoginActions from '../../../Actions/LoginActions';

require('./BestPost.scss');
const BestPost = React.createClass({
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
    const postList = this.props.postList;
    const postId = this.props.postId;
    const post = postList ? postList.getIn(['entities', 'posts', postId.toString()]) : null;
    const author = postList ? postList.getIn(['entities', 'author', post.get('author').toString()]) : null;

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
    const postUrl = `/community?categoryId=${categoryId}&forumId=${forumId}&postId=${postId}`;

    return (
      <div key={post.get('id')} className={"ui item " + styleClass}>
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
                {post.getIn(['forum', 'category', 'category_group', 'club', 'title'])}
              </div>
              <div className="item">
                <a href={"/club/" + 'url'}>{post.getIn(['forum', 'category', 'title'])}</a>
              </div>
              <div className="item">
                <a href={"/club/" + 'url'}>{post.getIn(['forum', 'title'])}</a>
              </div>
            </div>
          </div>
          <div className="meta best_post_meta">
            <div className="author_nick">
              {author.get('nick')}
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
                <i className="edit outline icon"></i>
              </div>
              <a className="comment_count">{post.get('comment_count')}</a>
            </div>
            <div className="report_box">
              <div className="report_icon">
                <i className="warning outline icon"></i>
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