import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CollectionComponent from '../BestCategorySelect/Collection';
import qs from 'qs';

const CollectionLeftMenu = props => {
  const {UserStore, location, Collections} = props;
  const user = UserStore.get('user');
  const order = qs.parse(location.search.slice(1)).order || 'new';
  const collectionId = location.pathname.split('/')[2];
  const collection = Collections.get(collectionId.toString());

  if (collection) {
    return (
      <div id="collection_left_menu">
        {/* Title */}
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'컬랙션 / ' +
            collection.get('title')}</div>
          </div>
        </div>

        {/* Menu */}
        <menu className="sub_category_list" key={collection.get('id')}>

          <ul >
            <li >
              <h5 className="">
                <a><i className="fa fa-feed"/>{' 뉴스피드'}</a>
              </h5>

              <div className="sub_category item">
                {
                  (order === 'new') &&
                  <div className="active-menu"/>
                }
                <Link to={{
                  pathname: `/collection/${collectionId}`,
                  search: `?order=new`
                }}>{'최신 글'}</Link>
              </div>
              <div className="sub_category item">
                {
                  (order === 'hot') &&
                  <div className="active-menu"/>
                }
                <Link to={{
                  pathname: `/collection/${collectionId}`,
                  search: `?order=hot`
                }}>{'인기 글'}</Link>
              </div>
              <div className="sub_category item">
                {
                  (order === 'm_view') &&
                  <div className="active-menu"/>
                }
                <Link to={{
                  pathname: `/collection/${collectionId}`,
                  search: `?order=m_view`
                }}>{'많이 본 글'}</Link>
              </div>
              <div className="sub_category item">
                {
                  (order === 'm_comment') &&
                  <div className="active-menu"/>
                }
                <Link
                  to={{
                    pathname: `/collection/${collectionId}`,
                    search: `?order=m_comment`
                  }}>{'댓글 많은 글'}</Link>
              </div>
            </li>

            {
              user &&
              <CollectionComponent
                {...props}
              />
            }

          </ul>
        </menu>
      </div>
    );
  } else {
    return (<div/>);
  }
}

CollectionLeftMenu.displayName = 'CollectionLeftMenu';
CollectionLeftMenu.propTypes = {
  UserStore: PropTypes.object.isRequired,
  ListStore: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  Forums: PropTypes.object.isRequired,
  Collections: PropTypes.object.isRequired,
  FireRequestCreateCollection: PropTypes.func.isRequired,
  FireRequestAddForumInCollection: PropTypes.func.isRequired,
  FireRequestRemoveForumInCollection: PropTypes.func.isRequired,
  FireRequestSearchForumToCollectionSubs: PropTypes.func.isRequired,
};

export default CollectionLeftMenu;
