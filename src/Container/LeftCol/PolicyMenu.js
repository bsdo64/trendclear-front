import React from 'react';
import {connect} from 'react-redux';
import {getLoginUser} from '../Util/func';

import PolicyMenu from '../../Components/PolicyMenu';

const MenuContainer = React.createClass({
  render() {
    return (<PolicyMenu {...this.props} />)
  }
});

module.exports = MenuContainer;
