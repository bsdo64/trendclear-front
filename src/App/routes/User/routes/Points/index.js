import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './routes/Home/index.js';
import ChargeLog from './routes/ChargeLog/index.js';
import MyPointRefund from './routes/myPointRefund/index.js';

const Points = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}/myPointRefund`} component={MyPointRefund} />
        <Route exact path={`${match.url}/chargeLog`} component={ChargeLog} />
        <Route exact path={`${match.url}`} component={Home} />
      </Switch>
    </div>
  )
};

export default Points;