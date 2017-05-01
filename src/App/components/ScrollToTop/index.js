import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

ScrollTop.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default withRouter(ScrollTop);
