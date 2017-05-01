import React from 'react';
import PropTypes from 'prop-types';

class AddForum1 extends React.Component {
  render() {
    const { url } = this.props;
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
  }
}

AddForum1.propTypes = {
  url: PropTypes.string,
};

export default AddForum1;
