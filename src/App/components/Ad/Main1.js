import React from 'react';
import PropTypes from 'prop-types';

const Main1 = props => {
  const { url } = props;
  return (
      <div>
        <img
            src={url}
            style={{
              padding: 10,
              width: '100%',
              borderTop: '1px solid #abc',
              borderBottom: '1px solid #abc',
            }}/>
      </div>
  );
};

Main1.propTypes = {
  url: PropTypes.string,
};

export default Main1;
