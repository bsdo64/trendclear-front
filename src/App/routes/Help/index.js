import React from 'react';
import Help from './components/Help/index';

class ActivityContainer extends React.Component {
  render() {
    return (<Help {...this.props} />);
  }
}

export default ActivityContainer;
