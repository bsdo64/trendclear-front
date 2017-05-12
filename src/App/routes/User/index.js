/**
 * Created by bsdo on 2017. 3. 28..
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Points from './routes/Points/index.js';
import Activity from './routes/Activity/index.js';
import Profile from './routes/Profile/index.js';
import ChargePoint from './routes/ChargePoint/index.js';
import Venalinks from './routes/Venalinks/index.js';

const User = (props) => {
  const { match } = props;

  return (
    <div>
      <Switch>
        {/* User */}
        <Route path={`${match.url}/venalinks`} component={Venalinks}/>
        <Route path={`${match.url}/chargePoint`} component={ChargePoint}/>
        <Route path={`${match.url}/activity`} component={Activity}/>
        <Route path={`${match.url}/points`} component={Points}/>
        <Route path={`${match.url}/profile`} component={Profile}/>
        <Route path={`${match.url}`} component={Profile}/>
      </Switch>
    </div>
  )
};

User.propTypes = {};
User.defaultProps = {};

export default User;
