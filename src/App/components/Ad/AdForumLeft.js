import React from 'react';
import PropTypes from 'prop-types';

const AdForumLeft = props => {
  const { url } = props;
  return (
    <div>
      <img
          src={url}
          style={{
            padding: 10,
            float: 'right',
          }}/>
    </div>
  );
};

AdForumLeft.propTypes = {
  url: PropTypes.string,
};

export default AdForumLeft;
