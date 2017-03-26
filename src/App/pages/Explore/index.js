import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GnbLeft from '../../containers/GnbLeft';

import RightSide from '../../containers/RightSide/RightSide';
import WidgetContainer from '../../containers/RightCol/WidgetContainer';

const Contents = (props) => {
  const {match} = props;
  return (
    <div id="container">

      <Route component={GnbLeft}/>

      <div id="section">
        <div id="contents">
          <Switch>
            <Route path={`${match.url}/posts`} render={() => <div className="explore_main">Hello Posts</div>} />
            <Route path={`${match.url}`} render={() => <div className="explore_main">Hello Main</div>} />
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

Contents.propTypes = {
  match: React.PropTypes.object.isRequired,
};

export default Contents;
