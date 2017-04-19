import React from 'react';
import PropTypes from 'prop-types';

const AddPost1 = props => {
  const { url } = props;
  return (
      <div>
        <img
            src={url}
            style={{
              padding: 10,
              width: '100%',
            }}/>
      </div>
  );
};

AddPost1.propTypes = {
  url: PropTypes.string,
};

export default AddPost1;
