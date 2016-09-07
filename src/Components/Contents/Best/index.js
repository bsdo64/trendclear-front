import React from 'react';
import Waypoint from 'react-waypoint';

import Header from '../../ContentBreadCrumb/ContentBreadCrumb';
import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';
import PostActions from '../../../Actions/PostActions';
import GnbActions from '../../../Actions/GnbActions';

const BestBox = React.createClass({
  componentWillUnmount() {
    // some example callbacks
    GnbActions.resetFilter();
  },
  
  componentDidMount() {
    $('.ui.embed').embed();
  },

  componentDidUpdate(prevProps, prevState) {
    $('.ui.embed').embed('refresh');
  },

  getMoreBest() {
    "use strict";

    const {PaginationStore, GnbStore, listName, location} = this.props;
    const Pagination = PaginationStore.get(listName);
    if (Pagination) {
      const nextPage = Pagination.get('next_page');

      const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];
      const normalize = categoryValue.map((object, key) => {
        return parseInt(object.value);
      });

      if (nextPage) {

        let pathname;
        switch(listName) {
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
            categoryValue: (normalize.length > 0) ? normalize: null
          }
        });
      }
    }
  },

  render() {
    const {location, listName, ListStore, Posts, Users, AuthStore, PaginationStore, LoginModalStore} = this.props;
    const Collection = PaginationStore.get(listName);

    return (
      <div id="best_contents" >

        <Header
          type={listName}
          location={location}
          breadcrumbs={[
            {title: '베스트', url: '/'},
            {title: '팔로잉'},
          ]}
        />

        <InfiniteList
          PostIdList={ListStore.get(listName)}
          PostItems={Posts}
          AuthorItems={Users}
          User={AuthStore}
          LoginModalFlag={LoginModalStore.get('openLoginModal')}
        />

        <Waypoint
          onEnter={this.getMoreBest}
          bottomOffset='-10%'
          scrollableAncestor={window || null}
        />

        <InfiniteLoader collection={Collection} />

      </div>
    )
  }
});

export default BestBox;
