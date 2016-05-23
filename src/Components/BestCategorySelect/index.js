import { Link, browserHistory } from 'react-router';
import Select from 'react-select';
import _ from 'lodash';
import GnbActions from '../../Actions/GnbActions';

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
      openFilter: false
    };
  },

  componentWillReceiveProps(nextProps) {
    
  },
  
  updateFilterValue(club, selectArray) {
    "use strict";
    
    GnbActions.updateFilter({[club]: selectArray});
  },

  toggleFilter() {
    "use strict";

    this.setState({openFilter: !this.state.openFilter});
  },
  
  render() {
    "use strict";

    const {GnbStore} = this.props;
    const INCat = GnbStore.getIn(['gnbMenu', 'INCat']);
    const clubs = INCat ? INCat.getIn(['entities', 'clubs']).toJS(): {};
    const categoryGroups = INCat ? INCat.getIn(['entities', 'categoryGroups']).toJS(): {};
    const categories = INCat ? INCat.getIn(['entities', 'categories']).toJS(): {};

    const clubMap = _.map(clubs, (value, key) => {
      return {value: key, label: value.title};
    });
    const categoryGroupsMap = _.map(categoryGroups, (value, key) => {
      return {value: key, label: value.title};
    });
    const categoriesMap = _.map(categories, (value, key) => {
      return {value: key, label: value.title};
    });

    const clubValue = GnbStore.get('clubValue') ? GnbStore.get('clubValue').toJS() : [];
    const categoryGroupValue = GnbStore.get('categoryGroupValue') ? GnbStore.get('categoryGroupValue').toJS() : [];
    const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];

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
                <a onClick={this.toggleFilter}>{'필터링'}</a>
              </h5>

              {
                this.state.openFilter &&
                [
                  <div key={'club'} className="sub_category item">
                    <a>{'클럽'}</a>
                    <Select
                      multi={true}
                      placeholder="클럽 선택 .."
                      value={clubValue}
                      options={clubMap}
                      onChange={this.updateFilterValue.bind(this, 'clubValue')}
                    />
                  </div>
                  ,
                  <div key={'category_group'} className="sub_category item">
                    <a>{'카테고리 그룹'}</a>
                    <Select
                      multi={true}
                      placeholder="그룹 선택 .."
                      value={categoryGroupValue}
                      options={categoryGroupsMap}
                      onChange={this.updateFilterValue.bind(this, 'categoryGroupValue')}
                    />
                  </div>
                  ,
                  <div key={'category'} className="sub_category item">
                    <a >{'카테고리'}</a>
                    <Select
                      multi={true}
                      placeholder="카테고리 선택 .."
                      value={categoryValue}
                      options={categoriesMap}
                      onChange={this.updateFilterValue.bind(this, 'categoryValue')}
                    />
                  </div>
                ]
              }
            </li>
          </ul>
        </menu>
    </div>
  }
})

export default Temp ;