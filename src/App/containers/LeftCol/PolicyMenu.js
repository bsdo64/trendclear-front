import React from 'react';
import PolicyMenu from '../../components/LeftMenus/PolicyMenu';

class MenuContainer extends React.Component {
  render() {
    return (<PolicyMenu {...this.props} />);
  }
}

module.exports = MenuContainer;
