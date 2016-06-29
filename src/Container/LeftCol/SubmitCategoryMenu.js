import React from 'react';
import {Link} from 'react-router';

const SubmitCategoryMenu = React.createClass({
  displayName: 'SubmitCategoryMenu',
  render() {
    "use strict";
    return (
      <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'만들기'}</div>
          </div>
        </div>
        <menu className="sub_category_list">

          <div className="sub_category_header">{'전체 메뉴'}</div>

          <ul >
            <li>
              <h5 className="">
                <a>{'카테고리'}</a>
              </h5>

              <div className="sub_category item">
                <Link to="/community/submit/forum">{'게시판'}</Link>
              </div>
              <div className="sub_category item">
                <Link to="/community/submit/forum/prefix">{'게시판 머릿말'}</Link>
              </div>
            </li>

          </ul>
        </menu>
      </div>
    )
  }
});

module.exports = SubmitCategoryMenu;