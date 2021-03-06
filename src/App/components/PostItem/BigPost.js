import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import AvatarImage from '../AvatarImage';
import Menu from './ReportMenu';
import ShareLinkMenu from './ShareLinkMenu';

import styles from './BigPost.css';
import './Post.scss';

class BigPost extends React.Component {
  constructor(props) {
    super(props);

    this.setScroll = this.setScroll.bind(this);
    this.sendLike = this.sendLike.bind(this);
    this.createIconImg = this.createIconImg.bind(this);
    this.currentAuthor = this.currentAuthor.bind(this);
  }
  componentDidMount() {
    this.postItem.addEventListener('click', this.setScroll);
  }

  componentWillUnmount() {
    this.postItem.removeEventListener('click', this.setScroll);
  }

  setScroll() {

    const currentScroll = document.body.scrollTop;
    this.props.FireSetScrollPosition(currentScroll);
  }

  sendLike() {

    const {post, location, user, FireRequestLikePost} = this.props;
    if (!user) {
      this.props.FireToggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search,
      });
    } else {
      FireRequestLikePost({postId: post.get('id')});
    }
  }

  createIconImg(iconImg) {
    if (iconImg) {
      return <img id="user_icon_img" src={'/images/' + iconImg}/>;
    }
  }

  currentAuthor() {

    Promise.resolve()
      .then(() => {
        return ReactTooltip.rebuild();
      })
      .then(() => {
        this.props.FireSetFocusCurrentPost({
          postId: this.props.post.get('id'),
          authorId: this.props.author.get('id')
        });
      });
  }

  render() {
    const {
      post, author, user, view, postStyle, shorten, history,
      FireToggleReportModal, FireToggleDeleteModal, FireOpenCommentUpdateView,
    } = this.props;

    const userId = user && user.get('id');
    const sex = author.getIn(['profile', 'sex']),
      avatar_img = author.getIn(['profile', 'avatar_img']),
      icon_img = author.getIn(['icon', 0, 'iconDef', 'icon_img']);

    const forumId = post.get('forum_id');
    const postId = post.get('id');
    const forumUrl = `/club/${forumId}`;
    const postUrl = `/club/${forumId}?postId=${postId}`;
    const liked = post.get('liked');

    const cPost = cx([styles.postContainer], 'best_list_item', {
      post_item: (postStyle === 'post_item'),
    });

    const isLong = (post.get('height') > 0) && (post.get('height') > 1000);
    const contentStyle = cx([styles.postContent], {
      [styles.shortenPost]: isLong,
    });

    return (
      <div ref={(ref) => this.postItem = ref}
           key={post.get('id')}
           className={cPost}
      >

        {/* meta */}
        <div className={cx('ui content ', styles.postBox)}>
          {/* forum */}
          <div className={cx('meta', styles.postHeader)}>
            <Link to={forumUrl}>{post.getIn(['forum', 'title'])}</Link>
            의 인기글
          </div>

          <div className={cx('meta_header', styles.postMetaHeader)}>

            {/* avatar */}
            <div className={cx(styles.avatarImage)}>
              <AvatarImage
                sex={sex}
                avatarImg={avatar_img}
              />
            </div>

            <div className={cx(styles.titleBox)}>
              {/* title */}
              <h3 className={cx(styles.title)}>
                <Link to={postUrl}>{post.get('title')}</Link>
              </h3>

              {/* nick, date, view */}
              <div className={cx(styles.writeMeta)}>
                <div className="ui horizontal divided list">
                  <div className="item">
                    <div className={cx(styles.authorNick)}>
                      <a data-tip
                         data-for="postauthor"
                         data-offset="{'bottom': 8, 'right': 42}"
                         onMouseOver={this.currentAuthor}
                      >
                        {author.get('nick')}
                      </a>
                    </div>
                    <div className={cx(styles.authorIcon)}>
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
            </div>
          </div>

          {/* post Ad*/}
          {/*
           (postStyle === 'post_item') &&
           <AdPost1 url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXpJWqQSSZ2s4-aw-miw-Q9spL7qCJ7rjOLav-VQpNpbdK5po" />
           */}

          {/* content */}
          <div className={contentStyle}
               dangerouslySetInnerHTML={{__html: post.get('content')}}></div>

          {/* isLong */}
          {
            isLong && shorten &&
            <div className="more_long_post">
              <div className="more_long_post_button">
                <Link to={postUrl} target="_blank">
                  <i className="fa fa-external-link"/>
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
              <div className={'like_icon ' + (liked ? 'active' : '')}
                   onClick={this.sendLike}>
                <i className={'heart ' + (liked ? '' : 'outline') + ' icon'}/>
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
              <ShareLinkMenu
                userId={userId}
                post={post}
                author={author}
                user={user}
                {...this.props}
              />
            </div>
            {
              userId &&
              <div className="report_box">
                <Menu
                  post={post}
                  history={history}
                  targetType="post"
                  forumId={post.get('forum_id')}
                  targetId={post.get('id')}
                  isUser={userId && (userId === author.get('id'))}
                  FireToggleReportModal={FireToggleReportModal}
                  FireToggleDeleteModal={FireToggleDeleteModal}
                  FireOpenCommentUpdateView={FireOpenCommentUpdateView}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

BigPost.displayName = 'BigPost';
BigPost.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  user: PropTypes.object,
  view: PropTypes.bool.isRequired,
  Venatems: PropTypes.object.isRequired,
  Items: PropTypes.object.isRequired,
  postStyle: PropTypes.string,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  shorten: PropTypes.bool.isRequired,
  FireSetScrollPosition: PropTypes.func.isRequired,
  FireToggleLoginModal: PropTypes.func.isRequired,
  FireToggleReportModal: PropTypes.func.isRequired,
  FireToggleDeleteModal: PropTypes.func.isRequired,
  FireRequestLikePost: PropTypes.func.isRequired,
  FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
  FireRequestActivateVenalink: PropTypes.func.isRequired,
  FireRequestParticipateVenalink: PropTypes.func.isRequired,
  FireOpenCommentUpdateView: PropTypes.func,
  FireSetFocusCurrentPost: PropTypes.func,
};

export default BigPost;
