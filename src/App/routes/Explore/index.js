import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { createLazyMod } from '../../Lib/utils';

const Main = createLazyMod(require('bundle-loader?lazy&name=[name]!./routes/index.js'));
const Club = createLazyMod(require('bundle-loader?lazy&name=[name]!./routes/Club/index.js'));
const Collections = createLazyMod(require('bundle-loader?lazy&name=[name]!./routes/Collection/index.js'));
const Post = createLazyMod(require('bundle-loader?lazy&name=[name]!./routes/Post/index.js'));
const Tags = createLazyMod(require('bundle-loader?lazy&name=[name]!./routes/Tags/index.js'));
// const Series = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/Series.js'));
// const Users = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/Users.js'));

const Contents = ({ match }) => {
  return (
    <Switch>
      {/*<Route path={`${match.url}/users`} component={Users}/>*/}
      {/*<Route path={`${match.url}/series`} component={Series}/>*/}
      <Route path={`${match.url}/collections`} component={Collections}/>
      <Route path={`${match.url}/tags`} component={Tags}/>
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
