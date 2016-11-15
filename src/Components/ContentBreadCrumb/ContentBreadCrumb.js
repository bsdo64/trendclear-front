import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Collections from '../../Stores/Domain/Collections';

require('./header.scss');
const BestHeader = React.createClass({
  displayName: 'BestHeader',
  propTypes: {
    type: PropTypes.string,
    location: PropTypes.object,
    breadcrumbs: PropTypes.array,
  },
  createBreadCrumbs(array = []) {

    return array.map((v, index) => {
      const component = [];

      v.url
        ? component.push(<Link to={v.url} className="section">{v.title}</Link>)
        : component.push(<div className="section">{v.title}</div>);

      (array.length !== (index + 1))
        ? component.push(<div className="divider"> / </div>)
        : false;

      return component;
    });
  },
  render() {
    const { type, location, breadcrumbs } = this.props;
    let breadcrumb;

    switch (type) {
      case 'bestPostList': {
        breadcrumb = this.createBreadCrumbs(breadcrumbs);

        return (
          <div className="ui breadcrumb content_header">
            <i className="fa fa-angle-right"/>
            {breadcrumb}
          </div>
        );
      }

      case 'collectionBestPostList': {

        const c = Collections.getState();
        const collectionId = location.pathname.split('/')[2];
        const collection = c.get(collectionId.toString());

        breadcrumb = this.createBreadCrumbs([
          { title: '나의 컬렉션' },
          { title: collection.get('title'), url: `/collection/${collectionId}` },
        ]);

        if (collection) {
          return (
            <div className="ui breadcrumb content_header">
              <i className="fa fa-angle-right"/>
              {breadcrumb}
            </div>
          );
        }

        return <div></div>;
      }

      default:
        return (
          <div className="ui breadcrumb content_header">
            <i className="fa fa-angle-right"/>
            {breadcrumb}
          </div>
        );
    }
  }
});

export default BestHeader;