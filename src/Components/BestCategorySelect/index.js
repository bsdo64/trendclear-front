import React from 'react';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';
import _ from 'lodash';
import GnbActions from '../../Actions/GnbActions';

require('./index.scss');
const Temp = React.createClass({
  getInitialState() {
    return {
      openFilter: false,
      modalIsOpen: false
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


    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

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
                  ,
                  <div key={'button'} className="ui container fluid" style={{display: 'inline-block'}}>
                    <button className="ui button inverted basic tiny right floated" style={{fontSize: '10px'}}>
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