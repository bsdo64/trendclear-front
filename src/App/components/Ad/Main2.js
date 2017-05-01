import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Main2 = props => {
  const { url, link } = props;
  return (
    <div style={{ marginTop: 10 }}>
      <Link to={link}>
        <img src={url}/>
      </Link>
    </div>
  );
};

Main2.propTypes = {
  link: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Main2;
