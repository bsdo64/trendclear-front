import React from 'react';

require('./Post.scss');
const Post = React.createClass({
  displayName: 'Post',
  render() {
    const IPost = this.props.post;
    const postId = IPost.get('result').toString();
    const post = IPost.getIn(['entities', 'posts', postId]);
    const author = IPost.getIn(['entities', 'author', post.get('author').toString()]);
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
          <h3 className="best_post_title"><a href={"/club/" + 'abc' + "/" + post.get('id')}>{post.get('title')}</a></h3>
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
              <div className="like_icon">
                <i className="heart outline icon"></i>
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

export default Post;