import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GnbStore from '../../Stores/GnbStore';

import CategoryList from '../../Components/CategoryList';

const MenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<CategoryList {...this.props} />)
  }
}));

module.exports = MenuContainer;
