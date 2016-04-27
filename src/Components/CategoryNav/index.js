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
    const { gnbMenu } = this.props;
    const data = gnbMenu.get('data');
    const openSideNow = gnbMenu.get('openSideNow');

    const createCategory = function (category) {
      return (
        <li key={category.get('id')}>
          <Link to={"/community?categoryId=" + category.get('id')}>{category.get('title')}</Link>
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
          <a ref="category_btn" href="#gnb_cate_layer1" data-clubid={club.get('id')} onMouseEnter={this.openSideCategories}>
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
                  <div className="special">
                    <h3 >스패셜</h3>
                    <ul className="category_lists">
                      <li><a
                        href="http://www.11st.co.kr/browsing/Bsshop.tmall?method=getBsshop&amp;bsshopId=half">하프클럽</a>
                      </li>
                      <li><a
                        href="http://www.11st.co.kr/disp/DTAction.tmall?ID=DLUXURY11&amp;ctgrNo=47031">럭셔리11</a>
                      </li>
                      <li><a
                        href="http://global.11st.co.kr/html/global/globalMain.html">해외직구</a>
                      </li>
                      <li><a href="http://www.11st.co.kr/html/FashionDept.html">패션백화점</a></li>
                      <li><a href="http://shop.11st.co.kr/mandarinaduck-official">만다리나덕</a>
                      </li>
                      <li><a href="http://shop.11st.co.kr/tandy2015">TANDY</a></li>
                      <li><a href="http://shop.11st.co.kr/lapkorea">LAP</a></li>
                      <li><a href="http://shop.11st.co.kr/parkadmin">파크랜드</a></li>
                      <li><a href="http://shop.11st.co.kr/giordano264">지오다노</a></li>
                      <li><a href="http://shop.11st.co.kr/elandesi">미쏘</a></li>
                      <li><a href="http://shop.11st.co.kr/stco2010">by STCO</a></li>
                    </ul>
                  </div>
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
    }

    return (
      <ul>
        {data.map(createClub.bind(this))}
      </ul>
    )
  }
})

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
})


require('./index.scss');
const CategoryNav = React.createClass({
  displayName: 'CategoryNav', handleToggleGnb() {
    "use strict";
    const { GnbStore } = this.props;
    const openGnb = GnbStore.get('openGnb');

    GnbActions.toggleGnb(openGnb);
  }, render() {
    const { GnbStore } = this.props;
    const openGnb = GnbStore.get('openGnb');
    const gnbMenu = GnbStore.get('gnbMenu');

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