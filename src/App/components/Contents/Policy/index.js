/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import PropTypes from 'prop-types';
import Privacy from './Privacy';
import Terms from './Terms';

require('./index.scss');
const PolicyBox = props => {
  function getEndpoint(location) {
    return location.pathname.split('/')[2];
  }

  const {location} = props;
  const endPoint = getEndpoint(location);

  switch (endPoint) {
    case 'privacy':
      return (<Privacy />);

    case 'terms':
      return (<Terms />);

    default:
      return (<Terms />);
  }
};

PolicyBox.displayName = 'PolicyBox';
PolicyBox.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PolicyBox;
