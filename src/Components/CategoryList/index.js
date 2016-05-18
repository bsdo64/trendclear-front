import { List } from 'immutable';
import { Link, browserHistory } from 'react-router';
import Immutable from 'immutable';

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
          subList.get('forums') &&
          subList.get('forums').map(function createListItem(list) {
            "use strict";
            
            let q = {
              categoryId: subList.get('id'),
              forumId: list.get('id')
            };

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
  createSubList(categoryGroup) {
    "use strict";

    return (
      <menu className="sub_category_list" key={Math.random()}>
        {
          categoryGroup.get('title') &&
          <div className="sub_category_header">{categoryGroup.get('title')}</div>
        }

        <ul >
          {
            categoryGroup.get('categories') &&
            categoryGroup.get('categories').map(this.createSubListItem)
          }
        </ul>
      </menu>
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
          category.get('category_groups').map(this.createSubList)
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
    if (categories) {
      return List.isList(categories) ?
        <div>{categories.map(this.createCategoryItem)}</div> :
        <div>{this.createCategoryItem(categories)}</div>;
    } else {
      return <div></div>;
    }
  }
});

export default CategoryList;