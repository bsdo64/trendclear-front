import React from 'react';
import { Route, Link } from 'react-router-dom';

import HeaderMyMenu from './MyMenu';
import HeaderSearch from './Search';

const Header = () => {
  return (
    <div id="global-header">
      <div className="top_area">
        <div className="top_contents">
          <div>
            <div id="top_logo" onClick={() => {
              document.body.scrollTop = 0;
            }}>
              <Link className="ui header inverted huge" to="/">
                <img src={require('../../images/Venacle.png')}/>
              </Link>
            </div>
            <div id="top_my_area">
              <Route path="*" component={HeaderMyMenu}/>
            </div>
            <div id="top_search">
              <Route path="*" component={HeaderSearch}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
