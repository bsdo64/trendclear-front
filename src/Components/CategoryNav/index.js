import React from 'react';
import { Link } from 'react-router';
import {fromJS} from 'immutable';
import { Scrollbars } from 'react-custom-scrollbars';

import GnbActions from '../../Actions/GnbActions';

const ClubList = React.createClass({
  displayName: 'ClubList',
  openSideCategories(e) {
    "use strict";
    e.preventDefault();
    e.stopPropagation();

    GnbActions.openSideCategory(e.target.dataset.clubid);
  },
  toggleGnb() {
    GnbActions.toggleGnb();
  },

  createCategory(item) {
    return (
      <li key={item.get('id')} onClick={this.toggleGnb}>
        <Link to={"/community?forumId=" + item.get('id')}>{item.get('title')}</Link>
      </li>
    )
  },

  createCategoryGroup(item) {
    return (
      <div className="four wide column group" key={item.get('id')}>
        <h3 >{item.get('title')}</h3>
        <ul className="category_lists">
          <Scrollbars style={{height: 80}}>
            {
              item.get('forums').map(this.createCategory)
            }
          </Scrollbars>
        </ul>
      </div>
    )
  },

  createClub (item) {
    const { gnbMenu } = this.props;
    const openSideNow = gnbMenu.get('openSideNow');

    return (
      <li key={item.get('id')} className="gnbm">
        <a className="category_btn"
           ref={'menu_btn_' + item.get('id')}
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
                {item.get('groups').map(this.createCategoryGroup)}
              </div>
            </div>
          </div>
        }
      </li>
    )
  },

  render() {
    "use strict";
    const { gnbMenu } = this.props;
    const groups = gnbMenu.get('data');
    const data = fromJS([{
      id: 1,
      title: '일반',
      groups: groups
    }, {
      id: 2,
      title: '인기 게시판',
      type: 'rank',
      groups: groups
    }, {
      id: 3,
      title: '새로운 게시판',
      type: 'rank',
      groups: groups
    }]);

    return (
      <ul>
        {data.map(this.createClub)}
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

    GnbActions.toggleGnb();
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
          <div ref="category_box" className="category_box">
            <div className="gnb_menu">
              <ClubList
                gnbMenu={gnbMenu}
                categorySet={categorySet}
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
