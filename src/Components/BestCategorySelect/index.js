import React from 'react';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';
import GnbActions from '../../Actions/GnbActions';

import Collection from './Collection';

require('./index.scss');
const Temp = React.createClass({
  getInitialState() {
    return {
      openFilter: false
    };
  },

  componentWillReceiveProps(nextProps) {
    
  },
  
  updateFilterValue(club, selectArray, event) {
    "use strict";

    GnbActions.updateFilter({[club]: selectArray});
  },

  toggleFilter() {
    "use strict";

    this.setState({openFilter: !this.state.openFilter});
  },

  saveFilter() {
    const {GnbStore} = this.props;
    const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];
    const normalize = categoryValue.map((object, key) => {
      return parseInt(object.value);
    });
    GnbActions.saveFilter({categoryValue: normalize});
  },
  
  render() {
    "use strict";

    const {ListStore, Categories, UserStore, GnbStore, Forums, Collections} = this.props;
    const user = UserStore.get('user');
    const categoriesMap = UserStore.get('follow_forums')
      ? UserStore
        .get('follow_forums')
        .map(forumId => {
          return {value: forumId, label: Forums.getIn([forumId.toString(), 'title'])}
        })
        .sortBy(item => item.label)
        .toJS()
      : ListStore
        .get('CategoryList')
        .map(categoryId => {
          return Categories.getIn([categoryId.toString(), 'forums']);
        })
        .reduce((list, i) => {
          return list.concat(i);
        })
        .map(forumId => {
          return Forums.get(forumId.toString());
        })
        .map(forum => {
          return {value: forum.get('id'), label: forum.get('title')}
        })
        .sortBy(item => item.label)
        .toList()
        .toJS();
    const categoryValue = GnbStore.get('categoryValue')
      ? GnbStore.get('categoryValue').toJS()
      : [];

    return <div id="best_category">
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'베스트'}</div>
          </div>
        </div>
        <menu className="sub_category_list">
          <ul >
            <li id="best_filter" >
              <h5 className="">
                <a onClick={this.toggleFilter}>
                  <i className="fa fa-star" />{' 팔로잉'}
                </a>
              </h5>
              {
                this.state.openFilter &&
                [
                  <div key={'category'} className="sub_category item">
                    <Select
                      multi={true}
                      placeholder="카테고리 선택 .."
                      backspaceToRemoveMessage="{label} 삭제하기 (Back space)"
                      value={categoryValue}
                      options={categoriesMap}
                      onChange={this.updateFilterValue.bind(this, 'categoryValue')}
                    />
                  </div>
                  ,
                  <div key={'button'} className="ui container fluid" style={{display: 'inline-block'}}>
                    <button className="ui button inverted basic tiny right floated"
                            style={{fontSize: '10px'}}
                            onClick={this.saveFilter}>
                      저장
                    </button>
                  </div>
                ]
              }
            </li>
            <li>
              <h5 className="">
                <Link to='/all'>
                  <i className="fa fa-globe" />{' 전체글'}
                </Link>
              </h5>
            </li>
            {
              user &&
              <Collection
                collections={Collections}
                forums={Forums}
              />
            }
          </ul>
        </menu>
    </div>
  }
});

export default Temp ;