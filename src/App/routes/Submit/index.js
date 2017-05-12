import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Main from './components/Main.js';
import Series from './routes/Series/index.js';
import Club from './routes/Club/index.js';
import Post from './routes/Post/index.js';

const Contents = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/series`} component={Series}/>
      <Route path={`${match.url}/club`} component={Club}/>
      <Route path={`${match.url}/post`} component={Post}/>
      <Route exact path={`${match.url}/`} component={Main}/>
    </Switch>
  );
};

Contents.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Contents;
