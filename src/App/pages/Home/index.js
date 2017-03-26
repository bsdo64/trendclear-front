import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GnbLeft from '../../containers/GnbLeft';
import Best from '../../containers/Contents/Best';
import RightSide from '../../containers/RightSide/RightSide';
import WidgetContainer from '../../containers/RightCol/WidgetContainer';

const Contents = () => {
  return (
    <div id="container">

      <Route component={GnbLeft}/>

      <div id="section">
        <div id="contents">
          <Switch>
            <Route path="/" component={Best}/>
          </Switch>
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
