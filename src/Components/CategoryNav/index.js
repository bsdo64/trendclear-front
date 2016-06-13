import React from 'react';
import { Link } from 'react-router';
import GnbActions from '../../Actions/GnbActions';

const ClubList = React.createClass({
  displayName: 'ClubList',
  openSideCategories(e, target, target2) {
    "use strict";
    GnbActions.openSideCategory(e.target.dataset.clubid);
  },
  render() {
    "use strict";
    const { gnbMenu, categorySet } = this.props;
    const data = gnbMenu.get('data');
    const openSideNow = gnbMenu.get('openSideNow');
    const INCat = gnbMenu.get('INCat');

    let forums;
    if (INCat && categorySet) {
      forums = INCat.getIn(['entities', 'categories', categorySet.toString(), 'forums']);
    }

    const createForumList = function (forumId) {
      return <li>
        <Link to={`/community?categoryId=${categorySet}&forumId=${forumId}`} >
          {INCat.getIn(['entities', 'forums', forumId.toString(), 'title'])}
        </Link>
      </li>
    };

    const createForum = function (categoryId) {
      GnbActions.getForums(categoryId);
    };

    const createCategory = function (category) {
      return (
        <li key={category.get('id')} onMouseEnter={createForum.bind(null, category.get('id'))}>
          <a to={"/community?categoryId=" + category.get('id')}>{category.get('title')}</a>
        </li>
      )
    };

    const createCategoryGroup = function (categoryGroup) {
      return (
        <div key={categoryGroup.get('id')}>
          <h3 >{categoryGroup.get('title')}</h3>
          <ul className="category_lists">
            {categoryGroup.get('categories').map(createCategory)}
          </ul>
        </div>
      )
    };

    const createClub = function (club) {
      return (
        <li key={club.get('id')} className="gnbm">
          <a className="category_btn"
             ref="category_btn"
             data-clubid={club.get('id')}
             onMouseEnter={this.openSideCategories}
             onClick={this.openSideCategories}>
            <i className="fa fa-hashtag"></i>
            <span>{club.get('title')}</span>
          </a>
          {
            (openSideNow == club.get('id')) &&
            <div className="gnb_inner_wrap">
              <div className="gnb_inner">
                <div className="grouping">
                  {club.get('category_groups').map(createCategoryGroup)}
                </div>
                <div className="grouping">
                  {
                    categorySet && forums &&
                    <div className="special">
                      <h3 >포럼</h3>
                      <ul className="category_lists">
                        {
                          forums.map(createForumList)
                        }
                      </ul>
                    </div>
                  }
                </div>
                <div className="banner">
                  <div className="ban02">
                    <a
                      href="http://www.11st.co.kr/browsing/MallPlanDetail.tmall?method=getMallPlanDetail&amp;planDisplayNumber=914513">
                      <img
                        src="http://www.aut.ac.nz/__data/assets/image/0009/367794/Poster-Converted.jpg"
                        alt="브라운브레스"/>
                    </a>
                  </div>
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
