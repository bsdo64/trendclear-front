import React from 'react';
import Policy from '../../components/Contents/Policy';

const ActivityContainer = React.createClass({
  render() {
    return (<Policy {...this.props} />);
  },
});

module.exports = ActivityContainer;
