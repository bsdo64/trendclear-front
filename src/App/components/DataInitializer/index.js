import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DataInitializer extends React.Component {

  constructor() {
    super();

    this.state = {
      initialized: false,
    };
  }

  componentDidMount() {
    this.props.initialize(this.props.location);
    this.setState({ initialized: true });
  }

  componentWillReceiveProps(nextProps) {
    // will be true
    if (this.state.initialized) {
      const locationChanged = nextProps.location !== this.props.location;

      if (locationChanged) {
        this.props.initialize(nextProps.location);
      }
    }
  }

  render() {
    return null;
  }
}

DataInitializer.propTypes = {
  initialize: React.PropTypes.func.isRequired,
  location: React.PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: (payload) => {
      dispatch({ type: '@@router/LOCATION_CHANGE', payload });
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataInitializer));
