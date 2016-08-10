import React from 'react';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';
import {map} from 'lodash';
import GnbActions from '../../Actions/GnbActions';

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
    const categoryValue = [];
    const normalize = categoryValue.map((object, key) => {
      return parseInt(object.value);
    });
    GnbActions.saveFilter({categoryValue: normalize});
  },
  
  render() {
    "use strict";

    const {UserStore, GnbStore} = this.props;
    const user = UserStore.get('user');
    const categoriesMap = [{value: 1, label: 'hello'}];
    const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];

    return <div id="best_category">
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'베스트'}</div>
          </div>
        </div>
        <menu className="sub_category_list">

          <div className="sub_category_header">{'전체보기'}</div>
          
          <ul >
            <li id="best_filter" >
              <h5 className="">
                <a onClick={this.toggleFilter}>{'팔로잉'}</a>
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
            {
              user &&
              <li id="user_best_collection">
                <h5 className="">
                  <a>{'콜랙션'}</a>
                </h5>

                <div className="sub_category item" onMouseOver={this.openCollection}>
                  <Link to={{pathname: '/community'}}>{'나의 게임'}</Link>
                  <div className="collection_list">
                    <ul className="forum_list">
                      <li className="forum_list_item">안녕</li>
                      <li className="forum_list_item">하세요</li>
                      <li className="forum_list_item">저는</li>
                      <li className="forum_list_item">도병수</li>
                      <li className="forum_list_item">입니다</li>
                    </ul>
                  </div>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: '/community'}}>{'나의 유머'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: '/community'}}>{'나의 날씨'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: '/community'}}>{'나의 컨텐츠'}</Link>
                </div>
                <div className="sub_category item">
                  <Link to={{pathname: '/community'}}>{'새로운 콜랙션 추가 +'}</Link>
                </div>
              </li>
            }
          </ul>
        </menu>
    </div>
  }
})

export default Temp ;