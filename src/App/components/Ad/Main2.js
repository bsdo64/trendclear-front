import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const Main2 = React.createClass({
  propTypes: {
    link: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  },

  render() {
    const { url, link } = this.props;
    return (
      <div style={{ marginTop: 10 }}>
        <Link to={link}>
          <img src={url}/>
        </Link>
      </div>
    );
  },
});

export default Main2;
