import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PolicyMenu = (props) => {
  function getEndpoint(location) {
    return location.pathname.split('/')[2];
  }

  function getTitle(endPoint) {
    switch (endPoint) {
      case 'privacy':
        return '개인정보보호';
      case 'terms':
        return '서비스 약관';
      default:
        return '정책';
    }
  }

  const {location} = props;
  const title = getTitle(getEndpoint(location));

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
              <Link to={'/policies/privacy'}>{'개인정보보호'}</Link>
            </div>
            <div className="sub_category item">
              <Link to={'/policies/terms'}>{'서비스 약관'}</Link>
            </div>
          </li>
        </ul>
      </menu>
    </div>
  );
};

PolicyMenu.displayName = 'PolicyMenu';
PolicyMenu.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PolicyMenu;
