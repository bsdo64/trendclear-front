import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Gnb from '../GnbLeft';
import ContentsContainer from '../../../Container/Contents/Best';
import RightSide from '../../../Container/RightSide/RightSide';
import WidgetContainer from '../../../Container/RightCol/WidgetContainer';

const Contents = () => {
  return (
    <div id="container">

      <Switch>
        <Route path="/signin" render={() => null}/>
        <Route component={Gnb}/>
      </Switch>

      <div id="section">
        <div id="contents">
          <Route component={ContentsContainer}/>
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
