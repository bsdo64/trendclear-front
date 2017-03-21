import React from 'react';
import PolicyMenu from '../../components/LeftMenus/PolicyMenu';

const MenuContainer = React.createClass({
  render() {
    return (<PolicyMenu {...this.props} />);
  },
});

module.exports = MenuContainer;
