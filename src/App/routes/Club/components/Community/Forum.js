import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import qs from 'qs';
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown';
import AvatarImage from '../../../../components/AvatarImage/index';
import marked from '../../../../Lib/Marked';
import MakeUrl from '../../../../Lib/MakeUrl';
import Paginator from '../../../../components/Paginator/index';
import { CLUB_NOT_EXIST } from '../../../../Constants/ErrorCodes';
import ClubNotExist from '../ClubNotExist/index.js';
import AdForum1 from '../../../../components/Ad/AddForum1';

require('./CommunityContents.scss');
class PostList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.trimContent = this.trimContent.bind(this);
  }
  componentDidMount() {
    $('.ui.embed').embed();
  }

  componentDidUpdate() {
    $('.ui.embed').embed('refresh');
  }

  trimContent(content) {
    return $(content).text().trim().slice(0, 100);
  }

  render() {
    const { item, author, postIdNow, defaultPageUrl, isAnnounce } = this.props;
    const id = item.get('id');
    const title = item.get('title');
    const prefix = item.get('prefix');
    const created_at = item.get('created_at');
    const view_count = item.get('view_count');
    const like_count = item.get('like_count');
    const comment_count = item.get('comment_count');

    const activeClass = cx({
      active: id === postIdNow,
      announce: isAnnounce,
    });

    const likedClass = cx('fa', {
      'fa-heart-o': !item.get('liked'),
      'fa-heart': item.get('liked'),
    });

    return (
      <tr className={activeClass}>
        {/*<td className="center aligned collapsing">{prefix &&*/}
        {/*prefix.get('name')}</td>*/}
        {/*<td className="center aligned collapsing">{like_count}</td>*/}
        {/*<td className="center aligned collapsing">{view_count}</td>*/}
        {/*<td className="left aligned">*/}
          {/*{*/}
            {/*isAnnounce &&*/}
            {/*<i className="fa fa-bullhorn announce-icon"/>*/}
          {/*}*/}
          {/*<Link*/}
            {/*className="article_title"*/}
            {/*to={defaultPageUrl}>*/}
            {/*{title}*/}
          {/*</Link>*/}
          {/*<span>{ comment_count > 0 && '[' + comment_count + ']'}</span>*/}
        {/*</td>*/}
        {/*<td className="right aligned collapsing">{author.get('nick')}</td>*/}
        {/*<td className="center aligned collapsing">{created_at}</td>*/}
        <td colSpan={6} style={{padding: 0}}>
          <div style={{display: 'flex', padding: 5}}>
            {
              item.get('has_img') &&
              <div style={{
                width: 80,
                maxHeight: 60,
                overflow: 'hidden',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <img
                  src={`/image/uploaded/files/small/${item.get('has_img')}`} />
              </div>
            }
            <div style={{flex: '0 1 580px', position: 'relative', paddingLeft: 10, overflow: 'hidden'}}>
              <Link
              className="article_title"
              style={{fontWeight: 'bold', fontSize: 14, color: '#007d8a'}}
              to={defaultPageUrl}>
                {isAnnounce && <i className="fa fa-thumb-tack" style={{paddingRight: 5}} />}
                {prefix && `[${prefix.get('name')}] `}
                {title}
              </Link>
              <div style={{position: 'absolute', top: 0, right: 0}}>
                <div style={{float: 'left', paddingRight: 15}}>
                  <i className={likedClass} style={{color: 'red', paddingRight: 5}} />{like_count}
                </div>
                <div style={{float: 'left'}}>
                  <i className="fa fa-edit" style={{paddingRight: 3}}/>{comment_count}
                </div>
              </div>
              <div style={{color: '#828282'}}>
                {author.get('nick')} | {created_at}
              </div>
              <div style={{wordBreak: 'break-word', fontSize: 13}}>
                {this.trimContent(item.get('content'))}
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

PostList.displayName = 'PostList';
PostList.propTypes =  {
  item: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    postIdNow: PropTypes.number.isRequired,
    defaultPageUrl: PropTypes.string.isRequired,
    isAnnounce: PropTypes.bool.isRequired,
};

class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleForumSearch = this.handleForumSearch.bind(this);
    this.handleSubmitPrefix = this.handleSubmitPrefix.bind(this);
    this.handleSetPage = this.handleSetPage.bind(this);
    this.resetPrefix = this.resetPrefix.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.createPrefixItem = this.createPrefixItem.bind(this);
    this.createPostItem = this.createPostItem.bind(this);
    this.selectCollection = this.selectCollection.bind(this);
    this.checkCollectionHasForums = this.checkCollectionHasForums.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
    this.isManager = this.isManager.bind(this);
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  handleForumSearch(e) {
    e.preventDefault();

    const makeUrl = new MakeUrl(this.props.location);
    this.props.history.push(makeUrl.setQuery('forumSearch', this.state.text).end());
  }

  handleSubmitPrefix(prefixId, e) {
    e.preventDefault();

    const makeUrl = new MakeUrl(this.props.location);
    makeUrl.removeQuery('forumSearch');
    this.props.history.push(makeUrl.setQuery('forumPrefix', prefixId).end());
  }
  handleSetPage(pagination) {

    const makeUrl = new MakeUrl(this.props.location);
    this.props.history.push(makeUrl.setQuery('p', pagination.page).end());
  }

  resetPrefix(e) {
    e.preventDefault();

    const makeUrl = new MakeUrl(this.props.location);
    this.props.history.push(
      makeUrl.removeQuery('forumPrefix', 'forumSearch').end());
  }

  openLoginModal() {
    const { location, FireToggleLoginModal } = this.props;
    FireToggleLoginModal({
      contentType: 'Login',
      location: location.pathname + location.search,
    });
  }

  createPrefixItem(Prefixes, prefixId) {

    const prefix = Prefixes.get(prefixId.toString());
    if (prefix) {
      const postCount = prefix.get('count') ? prefix.get('count') : 0;

      return (
        <div className="item" key={prefixId}>
          <div className="middle aligned content"
               onClick={this.handleSubmitPrefix.bind(this, prefixId)}>
            {prefix.get('name') + ' (' + postCount + ')'}
          </div>
        </div>
      );
    }
  }

  createPostItem(makeUrl, isAnnounce, postId) {

    const { Posts, Users, location } = this.props;
    const postIdNow = qs.parse(location.search.slice(1)).postId;

    const defaultPageUrl = makeUrl.setQuery('postId', postId)
      .removeQuery('comment_p')
      .end();

    let item = Posts.get(postId.toString());
    if (item) {
      let author = Users.get(item.get('author').toString());
      if (author) {
        return (
          <PostList
            isAnnounce={isAnnounce}
            key={postId}
            author={author}
            item={item} defaultPageUrl={defaultPageUrl}
            postIdNow={parseInt(postIdNow, 10)}/>
        );
      }
    }
  }

  selectCollection(e) {
    const {
      ListStore,
      FireRequestAddForumInCollection,
      FireRequestRemoveForumInCollection,
    } = this.props;
    const forumId = ListStore.get('forum');
    const params = { collectionId: e.target.value, forumId: forumId };

    if (e.target.checked) {
      FireRequestAddForumInCollection(params);
    } else {
      FireRequestRemoveForumInCollection(params);
    }
  }

  checkCollectionHasForums(collectionForumList, forumId) {

    return collectionForumList.includes(forumId);
  }

  toggleFollow(isForumFollow, forumId) {

    const {
      AuthStore,
      FireRequestFollowForum, FireRequestUnFollowForum,
    } = this.props;
    const userId = AuthStore.get('userId');
    if (!userId) {
      this.openLoginModal();
    } else {
      if (isForumFollow) {
        FireRequestUnFollowForum({ id: forumId, userId });
      } else {
        FireRequestFollowForum({ forumId: forumId, userId });
      }
    }
  }

  isManager(managerIds, userId) {
    if (managerIds && managerIds.size > 0) {
      return managerIds.includes(userId);
    } else {
      return false;
    }
  }

  render() {

    const { clubInfo,
      Users, Forums, Prefixes, AuthStore, ListStore, PaginationStore, Collections
    } = this.props;

    if (clubInfo && clubInfo.get('errorCode') === CLUB_NOT_EXIST) {
      return (<ClubNotExist />)
    }

    const self = this;
    const userId = AuthStore.get('userId');
    const isLogin = AuthStore.get('isLogin');

    const forumId = ListStore.get('forum');
    const postIds = ListStore.get('forumPostList');
    const pagination = PaginationStore.get('forumPostList');

    if (forumId && postIds && pagination) {
      const forum = Forums.get(forumId.toString());

      if (!forum) {
        return (<div/>);
      }

      const announceIds = forum.get('announces') || [];
      const managersIds = forum.get('managers') || [];
      const isUserForumFollow = isLogin
        ? Users
          .get(userId.toString())
          .get('follow_forums')
          .find(v => v === forumId)
        : false;

      const cFollowActive = cx(
        'ui button basic tiny right floated follow_button', {
          active: isUserForumFollow,
        });

      const page = pagination.get('current_page');
      const limit = pagination.get('limit');
      const total = pagination.get('total');

      const makeUrl = new MakeUrl(this.props.location);

      const creator = forum.get('creator');
      if (creator) {
        const creatorProfile = creator.get('profile');
        const isManager = this.isManager(forum.get('managers'), userId);

        return (
          <div id="forum_contents">
            <div className="box">
              <div id="forum_info">
                <div className="ui cards">
                  <div className="card" style={{
                    boxShadow: 'none',
                    width: '100%',
                  }}>
                    <div className="content">
                      {
                        creatorProfile &&
                        <AvatarImage
                          sex={creatorProfile.get('sex')}
                          avatarImg={creatorProfile.get('avatar_img')}
                          imageClass="right floated mini ui image"
                        />
                      }
                      <div className="header">
                        {forum.get('title')}

                        {
                          (isManager) &&
                          <Link to={{
                            pathname: `/club/settings`,
                            search: `?forumId=${forumId}`
                          }}
                                className="ui button basic tiny right floated">
                            <i className="fa fa-gear"/>
                            {' 설정'}
                          </Link>
                        }

                        {
                          userId && isLogin &&
                          <Dropdown className="subscribe_dropdown">
                            <DropdownTrigger
                              className="ui button basic tiny right floated">
                              <i className="fa fa-share"/>
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
                                      const collection = Collections.get(
                                        collectionId.toString());
                                      return (
                                        <li key={collectionId}
                                            className="collection_item">
                                          <div className="ui checkbox">
                                            <input
                                              id={`collection-id-${collectionId}`}
                                              type="checkbox"
                                              value={collection.get('id')}
                                              defaultChecked={self.checkCollectionHasForums(
                                                collection.get('forums'),
                                                forumId)}
                                              onChange={self.selectCollection}/>
                                            <label
                                              htmlFor={`collection-id-${collectionId}`}>{collection.get(
                                              'title')}</label>
                                          </div>
                                        </li>
                                      );
                                    })
                                }
                              </ul>
                            </DropdownContent>
                          </Dropdown>
                        }

                        {
                          !userId && !isLogin &&
                          <a onClick={this.openLoginModal}
                             className="ui button basic tiny right floated">
                            <i className="fa fa-share"/>
                            {' 구독'}
                          </a>
                        }

                        <a className={cFollowActive}
                           onClick={this.toggleFollow.bind(this,
                             isUserForumFollow, forumId)}>
                          <i className="fa fa-star"/>
                          {' 팔로우'}
                        </a>
                      </div>
                      <div className="meta">
                        {forum.get('sub_header')}
                      </div>
                      <div className="description">
                        {forum.get('description')}
                      </div>
                      <div className="meta forum_meta">
                        <div className="managers">{'매니저: '}
                          {
                            managersIds.map((userId, index) => {
                              const user = Users.get(userId.toString());
                              const comma = index !== (managersIds.size - 1)
                                ? ', '
                                : '';
                              return user ? `${user.get('nick')} ${comma}` : '';
                            })
                          }
                        </div>
                        <div className="forum_counts">
                          <span className="follow_counts">
                            팔로우 {forum.get('follow_count')} 명
                          </span>
                          <span className="subs_counts">
                            컬렉션 구독 {forum.get('subs_count')} 회
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="content">
                      {
                        forum.get('rule') &&
                        <div >
                          <div className="ui header tiny">
                            클럽 규칙
                          </div>
                          <div className="description"
                               dangerouslySetInnerHTML={{
                                 __html: marked(forum.get('rule')),
                               }}
                          />
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="ui horizontal celled list">
                <div className="item" style={{ fontWeight: 'bold' }}>
                  <div className="middle aligned content bold"
                       onClick={this.resetPrefix}>전체
                  </div>
                </div>
                {
                  forum.get('prefixes') &&
                  forum.get('prefixes')
                    .map(this.createPrefixItem.bind(this, Prefixes))
                }
              </div>
              <table className="ui table very compact">
                <thead>
                <tr>
                  <th className="center aligned">포스트</th>
                </tr>
                </thead>
                <tbody>

                {
                  announceIds &&
                  announceIds.map(this.createPostItem.bind(this, makeUrl, true))
                }

                {
                  postIds.map(this.createPostItem.bind(this, makeUrl, false))
                }

                </tbody>
              </table>
              <div className="ui right aligned container">
                {
                  userId && isLogin &&
                  <Link
                    className="ui button primary tiny"
                    to={{
                      pathname: `/submit/post`,
                      search: `?forumId=${forumId}`,
                    }}>
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
              <div className="ui divider"/>
              <div className="ui center aligned container">
                { (total > 0) &&
                <Paginator
                  total={total}
                  limit={limit}
                  page={page}
                  handleSetPage={this.handleSetPage}
                />
                }

                <div className="ui search mini" style={{ padding: '15px' }}>
                  <div className="ui icon input">
                    <form onSubmit={this.handleForumSearch}>
                      <input className="prompt"
                             type="text"
                             placeholder="게시글 검색..."
                             onChange={this.onChange}
                             value={this.state.text}
                      />
                    </form>
                    <i className="search icon"/>
                  </div>
                  <div className="results"/>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return <div/>;
    }

    return <div/>;
  }
}

Forum.displayName = 'Forum';
Forum.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  PaginationStore: PropTypes.object.isRequired,
  AuthStore: PropTypes.object.isRequired,
  ListStore: PropTypes.object.isRequired,

  Users: PropTypes.object.isRequired,
  Forums: PropTypes.object.isRequired,
  Prefixes: PropTypes.object.isRequired,
  Collections: PropTypes.object.isRequired,
  Posts: PropTypes.object.isRequired,
  FireToggleLoginModal: PropTypes.func.isRequired,
  FireRequestAddForumInCollection: PropTypes.func.isRequired,
  FireRequestRemoveForumInCollection: PropTypes.func.isRequired,
  FireRequestFollowForum: PropTypes.func.isRequired,
  FireRequestUnFollowForum: PropTypes.func.isRequired,
};

export default Forum;
