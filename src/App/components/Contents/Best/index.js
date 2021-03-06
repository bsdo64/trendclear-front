import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Waypoint from 'react-waypoint';
import Header from '../../ContentBreadCrumb/ContentBreadCrumb';
import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';
import qs from 'qs';

const ExploreHeader = () => {
  return (
    <div style={{ padding: 10 }}>
      <div style={{
        background: '#fff',
        padding: 10,
        boxShadow: '1px 1px 1px 0 #c6c6c6',
      }}>
        <h3 style={{ fontSize: '1.2em' }}>
          <i className="fa fa-star"
             style={{ color: 'yellow', paddingRight: 5 }}/>
          피드
        </h3>
        <p>인기글</p>
      </div>
    </div>
  );
};

const FeedHeader = () => {
  return (
    <div style={{ padding: 10 }}>
      <div style={{
        background: '#fff',
        padding: 10,
        boxShadow: '1px 1px 1px 0 #c6c6c6',
      }}>
        <h3 style={{ fontSize: '1.2em' }}>
          <i className="fa fa-star"
             style={{ color: 'yellow', paddingRight: 5 }}/>
          피드
        </h3>
        <p>팔로잉 인기글</p>
      </div>
    </div>
  );
};

const CollectionHeader = () => {
  return (
    <div style={{ padding: 10 }}>
      <div style={{
        background: '#fff',
        padding: 10,
        boxShadow: '1px 1px 1px 0 #c6c6c6',
      }}>
        <h3 style={{ fontSize: '1.2em' }}>
          <i className="fa fa-inbox"
             style={{ color: '#abc', paddingRight: 5 }}/>
          컬렉션
        </h3>
        <p>컬렉션 인기글</p>
      </div>
    </div>
  )
};

const ForumFeedHeader = () => {
  return (
    <div style={{ padding: 10 }}>
      <div style={{
        background: '#fff',
        padding: 10,
        boxShadow: '1px 1px 1px 0 #c6c6c6',
      }}>
        <h3 style={{ fontSize: '1.2em' }}>
          <i className="fa fa-inbox" style={{ color: '#abc', paddingRight: 5 }}/>
          클럽 피드
        </h3>
        <p>클럽 인기글</p>
      </div>
    </div>
  )
};

const BestBox = props => {
  function getMoreBest({ previousPosition, currentPosition, event }) {
    if (previousPosition === 'below' && currentPosition === 'inside' && event) {
      const body = event.target.body;
      if ((body) && body.clientHeight > 768) {
        const {
          listType, PaginationStore, GnbStore, listName, location, FireRequestGetMorePostList
        } = props;
        const Pagination = PaginationStore.get(listName);
        if (Pagination) {
          const nextPage = Pagination.get('next_page');

          const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get(
            'categoryValue').toJS() : [];
          const normalize = categoryValue.map((object) => {
            return parseInt(object.value);
          });

          if (nextPage) {

            let pathName;
            switch (listName) {
              case 'bestPostList':
                pathName = '/best';
                break;

              case 'collectionBestPostList':
                pathName = location.pathname + '/posts';
                break;

              case 'forumPostList':
                pathName = location.pathname;
                break;

              default:
                pathName = '/best';
            }

            const query = qs.parse(location.search.slice(1));

            FireRequestGetMorePostList({
              listName: listName,
              pathName: pathName,
              params: {
                page: nextPage,
                order: query.order || 'hot',
                categoryValue: (normalize.length > 0) ? normalize : null,
                listType: listType,
              },
            });
          }
        }
      }
    }
  }

  function createBreadCrumbArray(array, pathname) {
    array.push({ title: '베스트', url: '/' });

    switch (pathname) {
      case '/':
        array.push({ title: '팔로잉' });
        return array;
      case '/all':
      case '/explore/posts':
        array.push({ title: '전체글' });
        return array;
      default:
        array.push({ title: '전체글' });
        return array;
    }
  }

  const {
    location, listName, ListStore, Posts, Users, Collections, AuthStore, PaginationStore,
  } = props;
  const Collection = PaginationStore.get(listName);
  const breadcrumbs = createBreadCrumbArray([], location.pathname);
  return (
    <div id="best_contents">

      <Switch>
        <Route exact path="/club/:clubId/feed" component={ForumFeedHeader} />
        <Route exact path="/collection/:collectionId" component={CollectionHeader} />
        <Route exact path="/" component={FeedHeader} />
        <Route exact path="/explore/posts" component={ExploreHeader} />
      </Switch>

      <Header
        type={listName}
        location={location}
        breadcrumbs={breadcrumbs}
        collections={Collections}
      />

      <InfiniteList
        PostIdList={ListStore.get(listName)}
        PostItems={Posts}
        AuthorItems={Users}
        User={AuthStore}
        scrollHeight={ListStore.get('scrollHeight')}
        {...props}
      />

      <Waypoint
        debug
        onEnter={getMoreBest}
        bottomOffset='-200px'
        scrollableAncestor={window || null}
      />

      <InfiniteLoader collection={Collection}/>

    </div>
  );
};

BestBox.displayName = 'BestBox';
BestBox.propTypes = {
  PaginationStore: PropTypes.object.isRequired,
  GnbStore: PropTypes.object,
  Collections: PropTypes.object,
  ListStore: PropTypes.object.isRequired,
  Posts: PropTypes.object.isRequired,
  Users: PropTypes.object.isRequired,
  Venatems: PropTypes.object.isRequired,
  Items: PropTypes.object.isRequired,
  AuthStore: PropTypes.object.isRequired,
  listName: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  listType: PropTypes.string,

  FireSetScrollPosition: PropTypes.func.isRequired,
  FireToggleLoginModal: PropTypes.func.isRequired,
  FireRequestGetMorePostList: PropTypes.func.isRequired,
  FireToggleReportModal: PropTypes.func.isRequired,
  FireToggleDeleteModal: PropTypes.func.isRequired,
  FireRequestLikePost: PropTypes.func.isRequired,
  FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
  FireRequestActivateVenalink: PropTypes.func.isRequired,
  FireRequestParticipateVenalink: PropTypes.func.isRequired,
  FireSetFocusCurrentPost: PropTypes.func.isRequired,
};

export default BestBox;
