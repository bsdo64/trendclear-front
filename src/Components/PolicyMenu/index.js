import React from 'react';
import { Link, browserHistory } from 'react-router';
import CollectionComponent from '../BestCategorySelect/Collection';

import AdForumLeft from '../Ad/AdForumLeft';

require('./index.scss');
const PolicyMenu = React.createClass({
  displayName: 'PolicyMenu',
  getEndpoint(location) {
    return location.pathname.split('/')[2];
  },
  getTitle(endPoint) {
    switch(endPoint) {
      case 'privacy':
        return '개인정보보호';
      case 'terms':
        return '서비스 약관';
      default:
        return '정책';
    }
  },
  render() {
    const { CommunityStore, AuthStore, UserStore, Forums, Collections, location } = this.props;
    const title = this.getTitle(this.getEndpoint(location));

    return (
      <div id="forum_category">
        {/* Title */}
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{title}</div>
          </div>
        </div>

        {/* Menu */}
        <menu className="sub_category_list">

          <ul >
            <li >
              <h5 className="">
                <a>{' 메뉴'}</a>
              </h5>

              <div className="sub_category item">
                <Link to={{pathname: '/policies/privacy'}}>{'개인정보보호'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{pathname: '/policies/terms'}}>{'서비스 약관'}</Link>
              </div>
            </li>
          </ul>
        </menu>
      </div>
    );
  }
});

export default PolicyMenu;