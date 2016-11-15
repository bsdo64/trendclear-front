import React from 'react';
import PolicyMenu from '../../Components/PolicyMenu';

const MenuContainer = React.createClass({
  render() {
    return (<PolicyMenu {...this.props} />)
  }
});

module.exports = MenuContainer;
