import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Active from './routes/Active/index.js';
import Share from './routes/Share/index.js';

const Venalinks = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}/share`} component={Share} />
        <Route exact path={`${match.url}/active`} component={Active} />
        <Route exact path={`${match.url}`} component={Active} />
      </Switch>
    </div>
  )
};

export default Venalinks;