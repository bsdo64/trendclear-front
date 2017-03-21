import React from 'react';
import HelpMenu from '../../components/LeftMenus/HelpMenu';

const MenuContainer = React.createClass({
  render() {
    return (<HelpMenu {...this.props} />);
  },
});

module.exports = MenuContainer;
