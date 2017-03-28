import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './components/Main.js';
import Club from './components/Club.js';
import Series from './components/Series.js';
import Post from './components/Post.js';

const Contents = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/series`} component={Series} />
      <Route path={`${match.url}/clubs`} component={Club} />
      <Route path={`${match.url}/posts`} component={Post} />
      <Route path={`${match.url}/`} component={Main} />
    </Switch>
  );
};

Contents.propTypes = {
  match: React.PropTypes.object.isRequired,
};

export default Contents;
