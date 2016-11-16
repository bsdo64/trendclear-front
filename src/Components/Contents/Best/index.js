import React, { PropTypes } from 'react';
import Waypoint from 'react-waypoint';
import Header from '../../ContentBreadCrumb/ContentBreadCrumb';
import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';
import PostActions from '../../../Actions/PostActions';
import GnbActions from '../../../Actions/GnbActions';

const BestBox = React.createClass({
  displayName: 'BestBox',
  propTypes: {
    PaginationStore: PropTypes.object.isRequired,
    GnbStore: PropTypes.object,
    Collections: PropTypes.object,
    ListStore: PropTypes.object.isRequired,
    Posts: PropTypes.object.isRequired,
    Users: PropTypes.object.isRequired,
    AuthStore: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,

    FireSetScrollPosition: PropTypes.func.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
  },

  componentWillUnmount() {
    // some example callbacks
    GnbActions.resetFilter();
  },

  getMoreBest({ previousPosition, currentPosition, event }) {
    if (previousPosition === 'below' && currentPosition === 'inside' && event) {
      const body = event.target.body;
      if ((body) && body.clientHeight > 768) {
        const { PaginationStore, GnbStore, listName, location } = this.props;
        const Pagination = PaginationStore.get(listName);
        if (Pagination) {
          const nextPage = Pagination.get('next_page');

          const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];
          const normalize = categoryValue.map((object) => {
            return parseInt(object.value);
          });

          if (nextPage) {

            let pathname;
            switch (listName) {
              case 'bestPostList':
                pathname = '/best';
                break;

              case 'collectionBestPostList':
                pathname = location.pathname + '/posts';
                break;

              default:
                pathname = '/best';
            }

            PostActions.getBestPost({
              listName: listName,
              pathname: pathname,
              params: {
                page: nextPage,
                order: location.query.order || 'hot',
                categoryValue: (normalize.length > 0) ? normalize : null,
                listType: location.pathname === '/all' ? 'all' : null
              }
            });
          }
        }
      }
    }
  },

  createBreadCrumbArray(array, pathname) {
    array.push({ title: '베스트', url: '/' });

    switch (pathname) {
      case '/':
        array.push({ title: '팔로잉' });
        return array;
      case '/all':
        array.push({ title: '전체글' });
        return array;
    }
  },

  render() {
    const {
      location, listName, ListStore, Posts, Users, Collections, AuthStore, PaginationStore,
      FireSetScrollPosition, FireToggleLoginModal
    } = this.props;
    const Collection = PaginationStore.get(listName);
    const breadcrumbs = this.createBreadCrumbArray([], location.pathname);
    return (
      <div id="best_contents" ref="best_contents">

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
          FireSetScrollPosition={FireSetScrollPosition}
          FireToggleLoginModal={FireToggleLoginModal}
        />

        <Waypoint
          onEnter={this.getMoreBest}
          bottomOffset='-200px'
          scrollableAncestor={window || null}
        />

        <InfiniteLoader collection={Collection}/>

      </div>
    )
  }
});

export default BestBox;
