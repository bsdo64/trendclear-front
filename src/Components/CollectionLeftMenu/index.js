import React from 'react';
import { Link, browserHistory } from 'react-router';

import CollectionComponent from '../BestCategorySelect/Collection';
import SubscribeForumList from '../SubscribeForumList';

require('./index.scss');
const CollectionLeftMenu = React.createClass({
  displayName: 'CollectionLeftMenu',
  render() {
    const { UserStore, ListStore, location, Forums, Collections } = this.props;
    const user = UserStore.get('user');
    const collectionId = location.pathname.split('/')[2];
    const collection = Collections.get(collectionId.toString());

    if (collection) {
      return (
        <div id="collection_left_menu">
          {/* Title */}
          <div id="sub_category">
            <div className="sub_category_button">
              <div className="sub_category_text">{'컬랙션 / ' + collection.get('title')}</div>
            </div>
          </div>

          {/* Menu */}
          <menu className="sub_category_list" key={collection.get('id')}>

            <ul >
              <li >
                <h5 className="">
                  <a><i className="fa fa-feed" />{' 뉴스피드'}</a>
                </h5>

                <div className="sub_category item">
                  <Link to={{pathname: `/collection/${collectionId}`}}>{'최신 글'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: `/collection/${collectionId}`}}>{'인기 글'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: `/collection/${collectionId}`}}>{'많이 본 글'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: `/collection/${collectionId}`}}>{'댓글 많은 글'}</Link>
                </div>
              </li>

              {
                user &&
                <SubscribeForumList
                  searchForumList={ListStore.get('searchCollectionForumList')}
                  subscribeForumList={collection.get('forums')}
                  collection={collection}
                  forums={Forums}
                />
              }

              {
                user &&
                <CollectionComponent
                  collections={Collections}
                  forums={Forums}
                />
              }
            </ul>
          </menu>
        </div>
      )
    } else {
      return (<div></div>)
    }

    // if (categories) {
    //   return List.isList(categories) ?
    //     <div>{categories.map(this.createCategoryItem)}</div> :
    //     <div>{this.createCategoryItem(categories)}</div>;
    // } else {
    //   return <div></div>;
    // }
  }
});

export default CollectionLeftMenu;