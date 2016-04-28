import { List } from 'immutable';
import { Link, browserHistory } from 'react-router';

var React = require('react');

require('./index.scss');

const CategoryItem = React.createClass({
  displayName: 'CategoryItem',
  createSubListItem(subList) {
    let loc = browserHistory.createLocation(location);
    let q = {
      categoryId: subList.get('id')
    };

    return (
      <li key={Math.random()}>
        {
          subList.get('title') &&
          <h5 className="">
            <Link to={{pathname: loc.pathname, query: q}}>{subList.get('title')}</Link>
          </h5>
        }
        {
          subList.get('forums').map(function createListItem(list) {
            "use strict";
            
            let q = {
              categoryId: subList.get('id'),
              forumId: list.get('id')
            };

            console.log('ssssss');
            return (
              <div key={Math.random()} className="sub_category item">
                <Link to={{pathname: '/community', query: q}}>{list.get('title')}</Link>
              </div>
            )
          })
        }
      </li>
    )
  },
  render() {
    const { category } = this.props;
    console.log(category);
    return (
      <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{category.get('title')}</div>
          </div>
        </div>
        {
          category.get('category_groups').get(0).get('title') && category.get('category_groups').get(0).get('categories') &&
          <menu className="sub_category_list">
            <div className="sub_category_header">{category.get('category_groups').get(0).get('title')}</div>
            <ul >
              {category.get('category_groups').get(0).get('categories').map(this.createSubListItem)}
            </ul>
          </menu>
        }
      </div>
    )
  }
});

const CategoryList = React.createClass({
  displayName: 'CategoryList',
  createCategoryItem(category) {
    return <CategoryItem key={Math.random()} category={category} />;
  },
  render() {
    const { GnbStore } = this.props;
    const categories = GnbStore.get('categoryMenu').get('categories');
    return List.isList(categories) ?
      <div>{categories.map(this.createCategoryItem)}</div> :
      <div>{this.createCategoryItem(categories)}</div>;
  }
});

export default CategoryList;