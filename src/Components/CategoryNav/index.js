import React from 'react';
import { Link } from 'react-router';
import {fromJS} from 'immutable';
import { Scrollbars } from 'react-custom-scrollbars';

import GnbActions from '../../Actions/GnbActions';

let data = fromJS([{
  id: 1,
  title: '베나클',
  groups: [{
    id: 1,
    title: '뉴스',
    forums: [
      {id: 1, title: 'Hello'}, {id: 2, title: 'news'},
      {id: 5, title: 'Hello'}, {id: 6, title: 'news'}
    ]
  }, {
    id: 2,
    title: '게임',
    forums: [
      {id: 1, title: 'Hello'}, {id: 2, title: 'news'},
      {id: 3, title: 'Hello'}, {id: 4, title: 'news'},
      {id: 5, title: 'Hello'}, {id: 6, title: 'news'}
    ]
  }, {
    id: 3,
    title: 'IT/컴퓨터',
    forums: [{id: 1, title: 'Hello'}, {id: 2, title: 'news'}]
  }, {
    id: 4,
    title: '유머',
    forums: [
      {id: 1, title: 'Hello'}, {id: 2, title: 'news'},
      {id: 3, title: 'Hello'}, {id: 4, title: 'news'},
      {id: 5, title: 'Hello'}, {id: 6, title: 'news'}
    ]
  }, {
    id: 5,
    title: '패션',
    forums: [{id: 1, title: 'Hello'}, {id: 2, title: 'news'}]
  }, {
    id: 6,
    title: '뷰티',
    forums: [{id: 1, title: 'Hello'}, {id: 2, title: 'news'}]
  }, {
    id: 7,
    title: '만화',
    forums: [{id: 1, title: 'Hello'}, {id: 2, title: 'news'}]
  }, {
    id: 8,
    title: '영화',
    forums: [{id: 1, title: 'Hello'}, {id: 2, title: 'news'}]
  }, {
    id: 9,
    title: '자동차',
    forums: [{id: 1, title: 'Hello'}, {id: 2, title: 'news'}]
  }]
}]);

const ClubList = React.createClass({
  displayName: 'ClubList',
  openSideCategories(e, target, target2) {
    "use strict";
    GnbActions.openSideCategory(e.target.dataset.clubid);
  },
  render() {
    "use strict";
    const { gnbMenu, categorySet, data } = this.props;
    const openSideNow = gnbMenu.get('openSideNow');
    const INCat = gnbMenu.get('INCat');

    let forums;
    if (INCat && categorySet) {
      forums = INCat.getIn(['entities', 'categories', categorySet.toString(), 'forums']);
    }

    const createCategory = function (item) {
      return (
        <li key={item.get('id')} >
          <Link to={"/community?forumId=" + item.get('id')}>{item.get('title')}</Link>
        </li>
      )
    };

    const createCategoryGroup = function (item) {
      return (
        <div className="four wide column group" key={item.get('id')}>
          <h3 >{item.get('title')}</h3>
          <ul className="category_lists">
            <Scrollbars style={{height: 100}}>
              {
                item.get('forums').map(createCategory)
              }
            </Scrollbars>
          </ul>
        </div>
      )
    };

    const createClub = function (item) {
      return (
        <li key={item.get('id')} className="gnbm">
          <a className="category_btn"
             ref="category_btn"
             data-clubid={item.get('id')}
             onMouseEnter={this.openSideCategories}
             onClick={this.openSideCategories}>
            <i className="fa fa-list-ul"></i>
            <span>{' ' + item.get('title')}</span>
          </a>
          {
            (openSideNow == item.get('id')) &&
            <div className="gnb_inner_wrap">

              <div className="gnb_inner">
                  <div className="ui grid grouping">
                    {item.get('groups').map(createCategoryGroup)}
                  </div>
              </div>
            </div>
          }
        </li>
      )
    };

    return (
      <ul>
        {data.map(createClub.bind(this))}
      </ul>
    )
  }
});

const ClubListMain = React.createClass({
  displayName: 'ClubListMain',
  render() {
    "use strict";

    return (
      <div className="category_box_main">
        Hello main
      </div>
    )
  }
});

require('./index.scss');
const CategoryNav = React.createClass({
  displayName: 'CategoryNav',
  handleToggleGnb() {
    "use strict";
    const { GnbStore } = this.props;
    const openGnb = GnbStore.get('openGnb');

    GnbActions.toggleGnb(openGnb);
  },
  render() {
    const { GnbStore } = this.props;
    const openGnb = GnbStore.get('openGnb');
    const gnbMenu = GnbStore.get('gnbMenu');
    const categorySet = GnbStore.get('categorySet');

    return (
      <div>
        <div className="category_button" onClick={this.handleToggleGnb}>
          <i className="fa fa-bars"></i>
          <i className="fa fa-caret-right" aria-hidden="true"></i>
          <div className="category_text">카테고리</div>
        </div>

        { /* 카테고리 박스 */ }
        {
          openGnb &&
          <div ref="category_box" className="category_box" /*onMouseLeave={this.handleToggleGnb}*/>
            <div className="gnb_menu">
              <ClubList
                gnbMenu={gnbMenu}
                categorySet={categorySet}
                data={data}
              />
              <ClubListMain />
            </div>
          </div>
        }
      </div>
    )
  }
});

module.exports = CategoryNav;
