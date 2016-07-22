import React from 'react';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';
import {map} from 'lodash';
import GnbActions from '../../Actions/GnbActions';

if (process.env.browser === true) {
  require('./index.scss');
}
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
    const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS(): [];
    const normalize = categoryValue.map((object, key) => {
      return parseInt(object.value);
    });
    GnbActions.saveFilter({categoryValue: normalize});
  },
  
  render() {
    "use strict";

    const {GnbStore} = this.props;
    const INCat = GnbStore.getIn(['gnbMenu', 'INCat']);
    const clubs = INCat ? INCat.getIn(['entities', 'clubs']).toJS(): {};
    const categoryGroups = INCat ? INCat.getIn(['entities', 'categoryGroups']).toJS(): {};
    const categories = INCat ? INCat.getIn(['entities', 'categories']).toJS(): {};

    const categoriesMap = map(categories, (value, key) => {
      return {value: key, label: value.title};
    });

    const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];

    return <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'베스트'}</div>
          </div>
        </div>
        <menu id="best_filter" className="sub_category_list">

          <div className="sub_category_header">{'전체보기'}</div>
          
          <ul >
            <li>
              <h5 className="">
                <a onClick={this.toggleFilter}>{'필터링'}</a>
              </h5>

              {
                this.state.openFilter &&
                [
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
          </ul>
        </menu>
    </div>
  }
})

export default Temp ;