import React from 'react';
import HelpMenu from '../../components/LeftMenus/HelpMenu';

class MenuContainer extends React.Component {
  render() {
    return (<HelpMenu {...this.props} />);
  }
}

export default MenuContainer;
