import React from 'react';

const SubmitCategoryMenu = React.createClass({
  displayName: 'SubmitCategoryMenu',
  render() {
    "use strict";
    return (
      <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'글쓰기'}</div>
          </div>
        </div>
        <menu className="sub_category_list">
          <ul >
            <li>
              <h5 className="">
                <a>{'메뉴'}</a>
              </h5>

              <div className="sub_category item">
                <a>{'글 쓰기'}</a>
              </div>
            </li>

          </ul>
        </menu>
      </div>
    )
  }
});

module.exports = SubmitCategoryMenu;