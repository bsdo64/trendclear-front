/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Bundle from '../../Bundle/index.js';
import loadPrivacy from 'bundle-loader?lazy!./Privacy.js';
import loadTerms from 'bundle-loader?lazy!./Terms.js';

const Privacy = (props) => {
  return <Bundle load={loadPrivacy}>
      {Privacy => <Privacy {...props} />}
    </Bundle>
}

const Terms = (props) => {
  return <Bundle load={loadTerms}>
      {Terms => <Terms {...props} />}
    </Bundle>
}

const PolicyBox = () => {

  return (
    <div style={{padding: 10}}>
      <Switch>
        <Route path={`/policies/privacy`} component={Privacy}/>
        <Route path={`/policies/terms`} component={Terms}/>
        <Route component={Terms}/>
      </Switch>
    </div>
  )
};

PolicyBox.displayName = 'PolicyBox';
PolicyBox.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default PolicyBox;
