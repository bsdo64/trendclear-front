import { List } from 'immutable';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';
import {normalize, arrayOf} from 'normalizr';

var React = require('react');

require('./index.scss');

const CategoryItem = React.createClass({
  displayName: 'CategoryItem',
  createSubListItem(catId) {
    const { entities } = this.props;
    const subList = entities.get('categories').get(catId.toString());
    let loc = browserHistory.createLocation(location);
    let q = {
      categoryId: catId
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
          subList.get('forums').map(function createListItem(forumId) {
            "use strict";

            const forum = entities.get('forums').get(forumId.toString());

            let q = {
              categoryId: catId,
              forumId: forumId
            };

            var options = [
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' }
            ];

            function logChange(val) {
              console.log("Selected: ", val);
            }

            return (
              <div key={forumId} className="sub_category item">
                <Link to={{pathname: '/community', query: q}}>{forum.get('title')}</Link>
                <Select
                  multi
                  name="form-field-name"
                  value="one"
                  options={options}
                  onChange={logChange}
                />
              </div>
            )
          })
        }
      </li>
    )
  },
  createSubList(categoryGroupId) {
    "use strict";
    const { entities } = this.props;
    const categoryGroup = entities.get('categoryGroups').get(categoryGroupId.toString());

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
    const { club } = this.props;

    return (
      <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'베스트'}</div>
          </div>
        </div>
        {
          club.get('category_groups').map(this.createSubList)
        }
      </div>
    )
  }
});

const CategoryList = React.createClass({
  displayName: 'CategoryList',
  render() {
    const { GnbStore } = this.props;
    
    const categories = GnbStore.get('gnbMenu').get('INCat');

    function createCategoryItem(clubId) {
      const club = categories.get('entities').get('clubs').get(categoryId.toString());
      return <CategoryItem key={Math.random()} club={club} entities={categories.get('entities')} />;
    }

    return categories ?
      <div>
        {categories.get('result').map(this.createCategoryItem)}
      </div> :
      <div>

      </div>
  }
});

const Temp = React.createClass({
  getInitialState() {
    return {
      filtering: false
    }
  },

  toggleFiltering() {
    
  },
  render() {
    "use strict";

    var options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'three' },
      { value: 'four', label: 'four' },
      { value: 'five', label: 'five' },
      { value: 'he', label: 'he' },
    ];

    function logChange(val) {
      console.log("Selected: ", val);
    }

    return <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'베스트'}</div>
          </div>
        </div>
        <menu id="best_filter" className="sub_category_list" key={Math.random()}>

          <div className="sub_category_header">{'전체보기'}</div>

          <ul >
            <li key={Math.random()}>
              <h5 className="">
                <Link to={'/'}>{'필터링'}</Link>
              </h5>

              <div key={Math.random()} className="sub_category item">
                <Link to={'/'}>{'클럽'}</Link>
                <Select
                  multi
                  name="form-field-name"
                  value="one"
                  options={options}
                  onChange={logChange}
                />
              </div>

              <div key={Math.random()} className="sub_category item">
                <Link to={'/'}>{'카테고리 그룹'}</Link>
                <Select
                  multi
                  name="form-field-name"
                  value="one"
                  options={options}
                  onChange={logChange}
                />
              </div>

              <div key={Math.random()} className="sub_category item">
                <Link to={'/'}>{'카테고리'}</Link>
                <Select
                  multi
                  name="form-field-name"
                  value={["one", 'two', 'he', 'three', 'four', 'five']}
                  options={options}
                  onChange={logChange}
                />
              </div>

              <div key={Math.random()} className="sub_category item">
                <Link to={'/'}>{'게시판'}</Link>
                <Select
                  multi
                  name="form-field-name"
                  value="one"
                  options={options}
                  onChange={logChange}
                />
              </div>
            </li>
          </ul>
        </menu>
    </div>
  }
})

export default Temp ;