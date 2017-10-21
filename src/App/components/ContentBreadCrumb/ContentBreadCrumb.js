import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const style = require('./header.css');
const BestHeader = (props) => {
  function createBreadCrumbs(array = []) {

    return array.map((v, index) => {
      const component = [];

      v.url
        ? component.push(<Link key={index} to={v.url} className={style.section}>{v.title}</Link>)
        : component.push(<div key={index} className={style.section}>{v.title}</div>);

      (array.length !== (index + 1))
        ? component.push(<div key={index + 1} className={style.divider}> / </div>)
        : false;

      return component;
    });
  }

  const { type, location, breadcrumbs, collections } = props;
  let breadcrumb = createBreadCrumbs(breadcrumbs);

  switch (type) {
    case 'bestPostList': {
      breadcrumb = createBreadCrumbs(breadcrumbs);

      return (
        <div className={style.content_header}>
          <i className="fa fa-angle-right"/>
          {breadcrumb}
        </div>
      );
    }

    case 'forumPostList': {
      breadcrumb = createBreadCrumbs(breadcrumbs);

      return (
        <div className={style.content_header}>
          <i className="fa fa-angle-right"/>
          {breadcrumb}
        </div>
      );
    }

    case 'collectionBestPostList': {

      if (collections) {
        const collectionId = location.pathname.split('/')[2];
        const collection = collections.get(collectionId.toString());

        if (collection) {

          breadcrumb = createBreadCrumbs([
            { title: '나의 컬렉션' },
            {
              title: collection.get('title'),
              url: `/collection/${collectionId}`,
            },
          ]);

          return (
            <div className={style.content_header}>
              <i className="fa fa-angle-right"/>
              {breadcrumb}
            </div>
          );
        }
      }

      return <div></div>;
    }

    default:
      return (
        <div className={style.content_header}>
          <i className="fa fa-angle-right"/>
          {breadcrumb}
        </div>
      );
  }
};

BestHeader.displayName = 'BestHeader';
BestHeader.propTypes = {
  type: PropTypes.string,
  location: PropTypes.object,
  breadcrumbs: PropTypes.array,
  collections: PropTypes.object,
};

export default BestHeader;
