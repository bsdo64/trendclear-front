import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchMenu = props => {
  const {SearchStore} = props;
  const query = SearchStore.get('query');
  return (
    <div id="forum_category">
      {/* Title */}
      <div id="sub_category">
        <div className="sub_category_button">
          <div className="sub_category_text">{'검색 : ' + query}</div>
        </div>
      </div>

      {/* Menu */}
      <menu className="sub_category_list">

        <ul >
          <li >
            <h5 className="">
              <a><i className="fa fa-search"/>{' 검색피드'}</a>
            </h5>

            <div className="sub_category item">
              <Link to={{
                pathname: '/search',
                search: `?query=${query}&order=new`,
              }}>{'최신 글'}</Link>
            </div>
            <div className="sub_category item">
              <Link to={{
                pathname: '/search',
                search: `?query=${query}&order=hot`,
              }}>{'인기 글'}</Link>
            </div>
            <div className="sub_category item">
              <Link to={{
                pathname: '/search',
                search: `?query=${query}&order=m_view`,
              }}>{'많이 본 글'}</Link>
            </div>
            <div className="sub_category item">
              <Link to={{
                pathname: '/search',
                search: `?query=${query}&order=m_comment`,
              }}>{'댓글 많은 글'}</Link>
            </div>
          </li>
        </ul>
      </menu>
    </div>
  );
};

SearchMenu.displayName = 'SearchMenu';
SearchMenu.propTypes = {
  SearchStore: PropTypes.object.isRequired,
};

export default SearchMenu;
