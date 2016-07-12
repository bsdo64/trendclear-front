import React from 'react';
import {Link} from 'react-router';

const AccountCategoryMenu = (props) => (
  <div>
    <div id="sub_category">
      <div className="sub_category_button">
        <div className="sub_category_text">{'계정'}</div>
      </div>
    </div>
    <menu className="sub_category_list">

      <div className="sub_category_header">{'전체 메뉴'}</div>

      <ul >
        <li>
          <h5 className="">
            <a>{'나의 활동'}</a>
          </h5>

          <div className="sub_category item">
            <Link to="/activity/likes">{'나의 좋아요'}</Link>
          </div>
          <div className="sub_category item">
            <Link to="/activity/posts">{'나의 글'}</Link>
          </div>
          <div className="sub_category item">
            <Link to="/activity/comments">{'나의 댓글'}</Link>
          </div>
        </li>

        <li>
          <h5 className="">
            <a>{'설정'}</a>
          </h5>

          <div className="sub_category item">
            <Link to="/setting/password">{'비밀번호 변경'}</Link>
          </div>
          <div className="sub_category item">
            <Link to="/setting/profile">{'회원정보 변경'}</Link>
          </div>
        </li>

      </ul>
    </menu>
  </div>
);

module.exports = AccountCategoryMenu;