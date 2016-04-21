import { List } from 'immutable';

var React = require('react');

require('./index.scss');

const CategoryItem = React.createClass({
  displayName: 'CategoryItem',
  createListItem(list) {
    return (
      <div key={Math.random()} className="sub_category item">
        <a href="#">{list.get('title')}</a>
      </div>
    )
  },
  createSubListItem(subList) {
    return (
      <li key={Math.random()}>
        {
          subList.get('header') &&
          <h5 className="">
            <a href="#">{subList.get('header')}</a>
          </h5>
        }
        {subList.get('list').map(this.createListItem)}
      </li>
    )
  },
  render() {
    const { category } = this.props;
    return (
      <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{category.get('menuHeader')}</div>
          </div>
        </div>
        <menu className="sub_category_list">
          <div className="sub_category_header">{category.get('subHeader')}</div>
          <ul >
            {category.get('subList').map(this.createSubListItem)}
          </ul>
        </menu>
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