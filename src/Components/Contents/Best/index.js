import React from 'react';
import {Link} from 'react-router';

import BestList from './BestList';
import BestPagination from './BestPagination';
import PostActions from '../../../Actions/PostActions';
import GnbActions from '../../../Actions/GnbActions';

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

    const userId = user.get('id');
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
      <div key={post.get('id')} className={"ui item best_list_item"}
           onMouseEnter={this.show}
           onMouseLeave={this.close}
      >
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
              <div className={'ui icon dropdown report_icon ' + (this.state.open? '': 'none')}>
                <i className="warning outline icon"></i>
                <div className="menu">
                  <div className="item" data-value={post.get('id')} data-action="report">신고</div>
                  {/*<div className="item " data-value={post.get('id')} data-action="report_ad">광고 신고</div>*/}
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

  _onSelectOptionHandler(value, text, $selectedItem) {
    "use strict";

    const action = $selectedItem.data('action');

    switch (action) {
      case 'report':
        const { posts } = this.props;
        const postList = posts ? posts.get('postList') : undefined;
        const postObj = postList ? postList.get('entities'): {};

        const post = postObj.getIn(['posts', value.toString()]);

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

    $('.ui.dropdown.report_icon')
      .dropdown({
        onChange: self._onSelectOptionHandler
      });
  },

  componentDidUpdate() {
    "use strict";
    const self = this;

    $('.ui.dropdown.report_icon')
      .dropdown({
        onChange: self._onSelectOptionHandler
      });
  },

  componentWillUnmount() {
    $('.ui.dropdown.report_icon')
      .dropdown('destroy');
  },

  createItem(id) {
    "use strict";

    const {PostItems, AuthorItems, User} = this.props;

    const post = PostItems.get(id.toString());
    const author = AuthorItems.get(post.get('author').toString());

    return (
      <BestPost key={id} author={author} post={post} user={User}/>
    )
  },

  render() {
    const {PostIdList, PostItems, AuthorItems, User} = this.props;
    "use strict";

    const okey = PostItems.size && AuthorItems.size && User.size;

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

  createBestPagination(noMore, collection) {
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

    const {BestPostStore, GnbStore} = this.props;
    const noMore = BestPostStore.get('noMore');
    const collection = BestPostStore.getIn(['posts', 'collection']);
    const currentPage = collection ? collection.get('current_page') : 1;
    const nextPage = collection.get('next_page');


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
    const {BestPostStore, LoginStore, UserStore} = this.props;
    const posts = BestPostStore.get('posts');
    const noMore = BestPostStore.get('noMore');
    const collection = BestPostStore.getIn(['posts', 'collection']);

    const {ListStore, Posts, Users} = this.props;

    return (
      <div id="best_contents" >

        <InfiniteList
          PostIdList={ListStore.get('bestPostList')}
          PostItems={Posts}
          AuthorItems={Users}
          User={UserStore}
        />

        {/*        <BestList
          LoginStore={LoginStore}
          UserStore={UserStore}
          posts={posts}
        /> */}

        {
          this.createBestPagination(noMore, collection)
        }
      </div>
    )
  }
});

export default BestContents;
