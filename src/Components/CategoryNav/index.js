import React from 'react';
import { Link } from 'react-router';
import {fromJS} from 'immutable';
import { Scrollbars } from 'react-custom-scrollbars';
import cx from 'classnames';
import marked from '../Lib/Marked';

import AvatarImage from '../AvatarImage';

import GnbActions from '../../Actions/GnbActions';

const RankList = React.createClass({
  displayName: 'RankList',
  openForumMeta (forumId) {
    "use strict";

    GnbActions.openForumMeta(forumId);
  },
  stopEvent(e) {
    "use strict";
    e.preventDefault();
    e.stopPropagation();
  },
  render() {
    "use strict";
    const {openForumMeta, forums} = this.props;
    const self = this;
    return (
      <div className="forum_rank">
        <ul>
          {
            forums.get('data').map((forum, index) => {
              const creatorProfile = forum.get('creator').get('profile');
              const cButton = cx({
                active: forum.get('id') === openForumMeta
              });

              return (
                <li key={forum.get('id')} onMouseEnter={self.openForumMeta.bind(self, forum.get('id'))}
                >
                  <div className="forum_button">
                    <Link to={`/community?forumId=${forum.get('id')}`} className={cButton} >
                      {`${index + 1}. ${forum.get('title')}`}
                    </Link>
                  </div>
                  {
                    (openForumMeta == forum.get('id')) &&
                    <div className="forum_info" onMouseEnter={this.stopEvent}>
                      <div id="forum_contents">

                        <div id="forum_info" style={{
                          margin: '0 0 0 2px',
                          padding: 0,
                        }}>
                          <div className="ui cards">
                            <div className="card" style={{
                              borderTop: '1px solid rgb(5, 130, 148)',
                              boxShadow: 'none',
                              width: '100%'
                            }}>
                              <div className="content">
                                <AvatarImage
                                  sex={creatorProfile.get('sex')}
                                  avatarImg={creatorProfile.get('avatar_img')}
                                  imageClass="right floated mini ui image"
                                />
                                <div className="header">
                                  <Link to={`/community?forumId=${forum.get('id')}`} >
                                    {forum.get('title')}
                                  </Link>
                                </div>
                                <div className="meta">
                                  {forum.get('sub_header')}
                                </div>
                                <div className="description">
                                  {forum.get('description')}
                                </div>
                              </div>
                              <div className="content">
                                {
                                  forum.get('rule') &&
                                  <div >
                                    <div className="ui header tiny">
                                      클럽 규칙
                                    </div>
                                    <div className="description"
                                         dangerouslySetInnerHTML={{__html: marked(forum.get('rule'))}}
                                    ></div>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
});

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
    const type = item.get('type');
    const list = item.get('list');

    if (type === 'rank') {
      return (
        <li key={item.get('id')} className="gnbm">
          <a className="category_btn"
             ref={'menu_btn_' + item.get('id')}
             data-clubid={item.get('id')}
             onMouseEnter={this.openSideCategories}
             onClick={this.openSideCategories}>
            {
              (openSideNow == item.get('id')) &&
              <i className="fa fa-arrow-right"></i>
            }
            <span>{' ' + item.get('title')}</span>
          </a>
          {
            (openSideNow == item.get('id')) &&
            <div className="gnb_inner_wrap">

              <div className="gnb_inner">
                <div className="ui grid grouping">
                  {
                    (list === 'hot_forums') &&
                    <RankList
                      forums={item.get('groups')}
                      openForumMeta={gnbMenu.get('openForumMeta')}
                    />
                  }

                  {
                    (list === 'new_forums') &&
                    <RankList
                      forums={item.get('groups')}
                      openForumMeta={gnbMenu.get('openForumMeta')}
                    />
                  }
                </div>
              </div>
            </div>
          }
        </li>
      )
    } else {
      return (
        <li key={item.get('id')} className="gnbm">
          <a className="category_btn"
             ref={'menu_btn_' + item.get('id')}
             data-clubid={item.get('id')}
             onMouseEnter={this.openSideCategories}
             onClick={this.openSideCategories}>
            {
              (openSideNow == item.get('id')) &&
              <i className="fa fa-arrow-right"></i>
            }
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
    }
  },

  render() {
    "use strict";
    const { gnbMenu, newForums, hotForums } = this.props;
    const groups = gnbMenu.get('data');
    const data = fromJS([{
      id: 1,
      title: '일반',
      groups: groups
    }, {
      id: 2,
      title: '인기 게시판',
      type: 'rank',
      list: 'hot_forums',
      groups: hotForums
    }, {
      id: 3,
      title: '새로운 게시판',
      type: 'rank',
      list: 'new_forums',
      groups: newForums
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
    const newForums = GnbStore.get('newForums');
    const hotForums = GnbStore.get('hotForums');
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
                newForums={newForums}
                hotForums={hotForums}
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
