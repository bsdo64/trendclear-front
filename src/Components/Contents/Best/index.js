import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

import BestList from './BestList';
import BestPagination from './BestPagination';
import PostActions from '../../../Actions/PostActions';
import GnbActions from '../../../Actions/GnbActions';
import LoginActions from '../../../Actions/LoginActions';
import CommunityActions from '../../../Actions/CommunityActions';
import ReportActions from '../../../Actions/ReportActions';

import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import style from './BestPost.scss';
const Menu = (props) => {
  "use strict";

  function toggleModal (e) {
    "use strict";

    const action = e.target.dataset.action;
    const targetId = e.target.dataset.value;

    switch (action) {
      case 'report':
        console.log('포스트 신고 Id : ', targetId);
        const reportObj = {
          type: 'post',
          typeId: targetId
        };
        ReportActions.openReportModal(reportObj);
        break;
      case 'report_ad':

        console.log('포스트 광고 신고 Id : ', targetId);
        break;
      case 'delete_post':

        console.log('포스트 삭제 Id : ', targetId);
        break;
      default:
        break;
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className={"ui icon dropdown report_icon " + style.Hello}>
          <i className="warning outline icon"></i>
        </div>
      </DropdownTrigger>
      <DropdownContent>
        <div className="ui dropdown">
          <div className="ui menu transition visible" tabindex="-1">
            <div className="item" data-value={props.postId} data-action="report" onClick={toggleModal}>신고</div>
            {
              props.isUser &&
              <div className="item " data-value={props.postId} data-action="delete_post" onClick={toggleModal}>삭제하기</div>
            }
          </div>
        </div>
      </DropdownContent>
    </Dropdown>
  )
};

const BestPost = React.createClass({
  //mixins: [PureRenderMixin],

  sendLike() {
    "use strict";

    const {post, user, loginModalFlag} = this.props;
    if (!user) {
      LoginActions.toggleLoginModal(loginModalFlag, '/');
    } else {
      CommunityActions.likePost(post.get('id'));
    }
  },

  createAvatarImg(sex, avatarImg) {

    if (avatarImg) {
      return <img src={'/image/uploaded/files/' + avatarImg} />;
    } else {
      if (sex) {
        return <img src="/images/default-male.png" />;
      } else {
        return <img src="/images/default-female.png" />;
      }
    }
  },

  createIconImg(iconImg) {
    if (iconImg) {
      return <img id="user_icon_img" src={'/images/' + iconImg}/>;
    }
  },

  render() {
    "use strict";
    const {post, author, user} = this.props;

    const userId = user && user.get('id');
    const sex = author.getIn(['profile', 'sex']),
      avatar_img = author.getIn(['profile', 'avatar_img']),
      icon_img = author.getIn(['icon', 0, 'iconDef', 'icon_img']);

    const categoryId = post.get('category_id');
    const forumId = post.get('forum_id');
    const postId = post.get('id');
    const forumUrl = `/community?categoryId=${categoryId}&forumId=${forumId}`;
    const postUrl = `/community?categoryId=${categoryId}&forumId=${forumId}&postId=${postId}`;
    const liked = post.get('liked');

    return (
      <div key={post.get('id')} className={"ui item best_list_item"}>
        {/* avatar */}
        <div className="ui image tiny">
          { this.createAvatarImg(sex, avatar_img) }
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
              {this.createIconImg(icon_img)}
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
            <div className="report_box">
              <Menu
                postId={post.get('id')}
                isUser={userId && (userId === author.get('id'))}
              />
            </div>
          </div>
          {/* Comments */}
        </div>
      </div>
    )
  }
});

const InfiniteList = React.createClass({
  getDefaultProps() {
    return {
      PostIdList: [],
      PostItems: {}
    };
  },

  createItem(id) {
    "use strict";

    const {PostItems, AuthorItems, User, LoginModalFlag} = this.props;

    const post = PostItems.get(id.toString());
    const author = AuthorItems.get(post.get('author').toString());
    const user = User.get('userId') ? AuthorItems.get(User.get('userId').toString()) : null;

    return (
      <BestPost key={id} author={author} post={post} user={user} loginModalFlag={LoginModalFlag}/>
    )
  },

  render() {
    const {PostIdList, PostItems, AuthorItems, User} = this.props;
    "use strict";

    const okey = !!(PostItems.size && AuthorItems.size && User.size);

    return (
      <div className="ui items best_list">
        {
          okey &&
          PostIdList.map(this.createItem)
        }
      </div>
    )
  }
});

const BestContents = React.createClass({
  componentWillUnmount() {
    // some example callbacks
    window.removeEventListener('scroll', this.handleScroll);

    PostActions.resetBestPage();
    GnbActions.resetFilter();
  },
  componentDidMount() {
    $('.ui.embed').embed();
    window.addEventListener('scroll', this.handleScroll);
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },

  createBestPagination(collection) {
    "use strict";

    if (collection && collection.get('next_page')) {
      return <BestPagination  collection={collection}/>;
    } else {
      return (
        <div className="no-more-post">
          <div className="alert">
            더이상 표시할 추천 게시물이 없습니다
          </div>
        </div>
      )
    }
  },

  getMoreBest() {
    "use strict";

    const {PaginationStore, GnbStore} = this.props;
    const Pagination = PaginationStore.get('bestPostList');
    const nextPage = Pagination.get('next_page');

    const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];
    const normalize = categoryValue.map((object, key) => {
      return parseInt(object.value);
    });

    if (nextPage) {
      PostActions.getBestPost({
        page: nextPage,
        categoryValue: (normalize.length > 0) ? normalize: null
      });
    }
  },

  _getDocHeight(D) {
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  },
  handleScroll(event) {
    if($(window).scrollTop() + $(window).height() == this._getDocHeight(event.srcElement)) {
      this.getMoreBest();
    }
  },

  render() {
    const {ListStore, Posts, Users, AuthStore, PaginationStore, LoginModalStore} = this.props;
    const Pagination = PaginationStore.get('bestPostList');

    return (
      <div id="best_contents" >

        <InfiniteList
          PostIdList={ListStore.get('bestPostList')}
          PostItems={Posts}
          AuthorItems={Users}
          User={AuthStore}
          LoginModalFlag={LoginModalStore.get('openLoginModal')}
        />

        {
          this.createBestPagination(Pagination)
        }
      </div>
    )
  }
});

export default BestContents;
