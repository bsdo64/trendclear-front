import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GnbLeft from '../../containers/GnbLeft';

import RightSide from '../../containers/RightSide/RightSide';
import WidgetContainer from '../../containers/RightCol/WidgetContainer';

const Contents = () => {
  return (
    <div id="container">

      <Route component={GnbLeft}/>

      <div id="section">
        <div id="contents">
          <div className="explore_main">Hello</div>
        </div>

        <Route component={RightSide}/>

        <div id="right_col">
          <Route component={WidgetContainer}/>
        </div>
      </div>
    </div>
  );
};

export default Contents;
