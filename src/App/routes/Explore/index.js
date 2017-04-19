import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Main from './components/Main.js';
import Club from './components/Club.js';
import Series from './components/Series.js';
import Post from './components/Post.js';
import Tags from './components/Tags.js';
import Users from './components/Users.js';

const Contents = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/users`} component={Users}/>
      <Route path={`${match.url}/tags`} component={Tags}/>
      <Route path={`${match.url}/series`} component={Series}/>
      <Route path={`${match.url}/clubs`} component={Club}/>
      <Route path={`${match.url}/posts`} component={Post}/>
      <Route path={`${match.url}/`} component={Main}/>
    </Switch>
  );
};

Contents.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Contents;
