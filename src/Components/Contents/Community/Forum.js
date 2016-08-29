import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import cx from 'classnames';
import {browserHistory, Link} from 'react-router';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import AvatarImage from '../../AvatarImage';

import MakeUrl from '../../Lib/MakeUrl';
import Paginator from '../../Paginator';

import UserActions from '../../../Actions/UserActions';
import LoginActions from '../../../Actions/LoginActions';
import CollectionActions from '../../../Actions/CollectionActions';

require('./CommunityContents.scss');
const PostList = React.createClass({
  displayName: 'PostList',
  mixins: [PureRenderMixin],

  componentDidMount() {
    $('.ui.embed').embed();
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },


  render: function () {
    const item = this.props.item;
    const id = item.get('id');
    const title = item.get('title');
    const prefix= item.get('prefix');
    const created_at = item.get('created_at');
    const view_count = item.get('view_count');
    const like_count = item.get('like_count');
    const comment_count = item.get('comment_count');
    const forum = item.get('forum');

    const author = this.props.author;

    const activeClass = cx({
      active: id == this.props.postIdNow
    });

    return (
      <tr className={activeClass}>
        <td className="center aligned collapsing">{prefix && prefix.get('name')}</td>
        <td className="center aligned collapsing">{like_count}</td>
        <td className="center aligned collapsing">{view_count}</td>
        <td className="left aligned">
          <Link
            className="article_title"
            to={this.props.defaultPageUrl} >
            {title}
          </Link>
          <span>{ comment_count > 0 && '[' + comment_count + ']'}</span>
        </td>
        <td className="right aligned collapsing">{author.get('nick')}</td>
        <td className="center aligned collapsing">{created_at}</td>
      </tr>
    );
  }
});

const Forum = React.createClass({
  displayName: 'Forum',
  // mixins: [PureRenderMixin],
  getInitialState() {
    return {
      text: ''
    }
  },
  onChange(e) {
    this.setState({text: e.target.value});
  },
  handleForumSearch(e) {
    e.preventDefault();

    const makeUrl = new MakeUrl(this.props.location);
    browserHistory.push(makeUrl.setQuery('forumSearch', this.state.text));
  },
  handleSubmitPrefix(prefixId, e) {
    "use strict";
    e.preventDefault();

    const makeUrl = new MakeUrl(this.props.location);
    makeUrl.removeQuery('forumSearch')
    browserHistory.push(makeUrl.setQuery('forumPrefix', prefixId));
  },
  handleSetPage(pagination) {

    const makeUrl = new MakeUrl(this.props.location);
    browserHistory.push(makeUrl.setQuery('p', pagination.page));
  },
  resetPrefix(e) {
    e.preventDefault();

    const makeUrl = new MakeUrl(this.props.location);
    browserHistory.push(makeUrl.removeQuery('forumPrefix', 'forumSearch'));
  },

  openLoginModal() {
    "use strict";

    const modalFlag = this.props.LoginModalStore.get('openLoginModal');
    const location = this.props.location;
    LoginActions.toggleLoginModal(modalFlag, location.pathname + location.search);
  },

  createPrefixItem(Prefixes, prefixId) {
    "use strict";

    const prefix = Prefixes.get(prefixId.toString());
    if (prefix) {
      const postCount = prefix.get('count') ? prefix.get('count') : 0;

      return (
        <div className="item" key={prefixId}>
          <div className="middle aligned content" onClick={this.handleSubmitPrefix.bind(this, prefixId)}>
            {prefix.get('name') + " (" + postCount + ")"}
          </div>
        </div>
      )
    }
  },
  createPostItem(makeUrl, postId) {
    "use strict";

    const {Posts, Users} = this.props;
    const postIdNow = this.props.location.query.postId;

    makeUrl.setQuery('postId', postId);
    const defaultPageUrl = makeUrl.removeQuery('comment_p');

    let item = Posts.get(postId.toString());
    if (item) {
      let author = Users.get(item.get('author').toString());
      if (author) {
        return (
          <PostList
            key={postId}
            author={author}
            item={item} defaultPageUrl={defaultPageUrl}
            postIdNow={parseInt(postIdNow, 10)} />
        );
      }
    }
  },

  selectCollection(e) {
    "use strict";
    const {ListStore} = this.props;
    const forumId = ListStore.get('forum');
    const params = {collectionId: e.target.value, forumId: forumId};

    if (e.target.checked) {
      CollectionActions.addForum(params)
    } else {
      CollectionActions.removeForum(params)
    }
  },
  checkCollectionHasForums(collectionForumList, forumId) {
    "use strict";

    return collectionForumList.includes(forumId);
  },

  toggleFollow(followItem, forumId) {
    "use strict";

    const {AuthStore} = this.props;
    const userId = AuthStore.get('userId');
    if (!userId) {
      this.openLoginModal();
    }  else {
      if (followItem) {
        UserActions.unFollowForum(followItem.toJS());
      } else {
        UserActions.followForum({forumId: forumId});
      }
    }
  },

  render() {
    "use strict";

    const {Users, Forums, Prefixes, AuthStore, ListStore, PaginationStore, Collections} = this.props;

    const self = this;
    const userId = AuthStore.get('userId');
    const isLogin = AuthStore.get('isLogin');

    const forumId = ListStore.get('forum');
    const postIds = ListStore.get('forumPostList');
    const pagination = PaginationStore.get('forumPostList');

    if (forumId && postIds && pagination) {
      const forum = Forums.get(forumId.toString());
      const isUserForumFollow = isLogin ?
        Users.get(userId.toString()).get('follow_forums').find(v => v.get('forum_id') === forumId) :
        false;

      if (!forum) {
        return (<div></div>)
      }

      const cFollowActive = cx('ui button primary basic tiny right floated follow_button', {
        active: isUserForumFollow
      });

      const title = forum.get('title');
      const description = forum.get('description');
      const url = forum.get('url');

      const page = pagination.get('current_page');
      const limit = pagination.get('limit');
      const total = pagination.get('total');

      const makeUrl = new MakeUrl(this.props.location);

      const creator = forum.get('creator');
      if (creator) {
        const creatorProfile = creator.get('profile');

        return (
          <div id="forum_contents">

            <div id="forum_info" style={{
              margin: '0 0 0 2px',
              padding: 0,
            }}>
              <div className="ui cards">
                <div className="card" style={{
                  borderTop: '1px solid rgb(5, 130, 148)',
                  boxShadow: 'none',
                  width: '100%'
                }}>
                  <div className="content">
                    <AvatarImage
                      sex={creatorProfile.get('sex')}
                      avatarImg={creatorProfile.get('avatar_img')}
                      imageClass="right floated mini ui image"
                    />
                    <div className="header">
                      {forum.get('title')}

                      {
                        (userId === creator.get('id')) &&
                        <Link to={`/community/settings?forumId=${forumId}`}
                              className="ui button primary basic tiny right floated">
                          <i className="fa fa-gear" />
                          {' 설정'}
                        </Link>
                      }

                      {
                        userId && isLogin &&
                        <Dropdown className="subscribe_dropdown" ref="subscribe_dropdown">
                          <DropdownTrigger className="ui button primary basic tiny right floated">
                            <i className="fa fa-share" />
                            {' 구독'}
                          </DropdownTrigger>
                          <DropdownContent>
                            <h4>구독 컬렉션 선택</h4>
                            <ul className="collection_list">
                              {
                                Users
                                  .get(userId.toString())
                                  .get('collections')
                                  .map(collectionId => {
                                    const collection = Collections.get(collectionId.toString());
                                    return (
                                      <li key={collectionId} className="collection_item">
                                        <div className="ui checkbox">
                                          <input id={`collection-id-${collectionId}`}
                                                 type="checkbox"
                                                 value={collection.get('id')}
                                                 defaultChecked={self.checkCollectionHasForums(collection.get('forums'), forumId)}
                                                 onChange={self.selectCollection} />
                                          <label htmlFor={`collection-id-${collectionId}`}>{collection.get('title')}</label>
                                        </div>
                                      </li>
                                    )
                                  })
                              }
                            </ul>
                          </DropdownContent>
                        </Dropdown>
                      }

                      {
                        !userId && !isLogin &&
                        <a onClick={this.openLoginModal} className="ui button primary basic tiny right floated">
                          <i className="fa fa-star" />
                          {' 구독'}
                        </a>
                      }

                      <a className={cFollowActive} onClick={this.toggleFollow.bind(this, isUserForumFollow, forumId)}>
                        <i className="fa fa-star" />
                        {' 팔로우'}
                      </a>
                    </div>
                    <div className="meta">
                      {forum.get('sub_header')}
                    </div>
                    <div className="description">
                      {forum.get('description')}
                    </div>
                  </div>
                  <div className="content">
                    {
                      forum.get('rule') &&
                      <div >
                        <div className="ui header tiny">
                          클럽 규칙
                        </div>
                        <div className="description">
                          {forum.get('rule')}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="ui horizontal celled list">
              <div className="item" style={{fontWeight: 'bold'}}>
                <div className="middle aligned content bold" onClick={this.resetPrefix}>전체</div>
              </div>
              {
                forum.get('prefixes') &&
                forum.get('prefixes').map(this.createPrefixItem.bind(this, Prefixes))
              }
            </div>
            <table className="ui table very compact" >
              <thead>
              <tr>
                <th className="center aligned collapsing">말머리</th>
                <th className="center aligned collapsing">좋아요</th>
                <th className="center aligned collapsing">조회</th>
                <th className="center aligned">제목</th>
                <th className="center aligned collapsing">글쓴이</th>
                <th className="center aligned collapsing">등록일</th>
              </tr>
              </thead>
              <tbody>

              {
                postIds.map(this.createPostItem.bind(this, makeUrl))
              }

              </tbody>
            </table>


            <div className="ui right aligned container">
              {
                userId && isLogin &&
                <Link
                  className="ui button primary tiny"
                  to={{pathname: '/community/submit', query: {forumId: forumId}}}>
                  글쓰기
                </Link>
              }
              {
                !userId && !isLogin &&
                <a
                  className="ui button primary tiny"
                  onClick={this.openLoginModal}>
                  글쓰기
                </a>
              }
            </div>

            <div className="ui divider"></div>

            <div className="ui center aligned container">

              { (total > 0) &&
              <Paginator
                total={total}
                limit={limit}
                page={page}
                handleSetPage={this.handleSetPage}
              />
              }

              <div className="ui search mini" style={{padding: '15px'}}>
                <div className="ui icon input">
                  <form onSubmit={this.handleForumSearch}>
                    <input className="prompt"
                           type="text"
                           placeholder="게시글 검색..."
                           onChange={this.onChange}
                           value={this.state.text}
                    />
                  </form>
                  <i className="search icon"></i>
                </div>
                <div className="results"></div>
              </div>
            </div>


          </div>
        );
      }

      return <div></div>
    }

    return <div></div>
  }
});

export default Forum;