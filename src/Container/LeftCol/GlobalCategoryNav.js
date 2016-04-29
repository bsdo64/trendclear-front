import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GnbStore from '../../Stores/GnbStore';

import CategoryNav from '../../Components/CategoryNav';

const LeftColCategoryNav = connectToStores({
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
    return (<CategoryNav {...this.props} />)
  }
}));

module.exports = LeftColCategoryNav;
