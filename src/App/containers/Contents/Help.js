import React from 'react';
import Help from '../../components/Contents/Help';

class ActivityContainer extends React.Component {
  render() {
    return (<Help {...this.props} />);
  }
}

module.exports = ActivityContainer;
