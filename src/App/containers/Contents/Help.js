import React from 'react';
import Help from '../../components/Contents/Help';

const ActivityContainer = React.createClass({
  render() {
    return (<Help {...this.props} />);
  },
});

module.exports = ActivityContainer;
