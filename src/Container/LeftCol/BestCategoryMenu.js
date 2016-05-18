import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GnbStore from '../../Stores/GnbStore';

import BestCategorySelect from '../../Components/BestCategorySelect';

const BestCategoryMenu = connectToStores({
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
    return (<BestCategorySelect {...this.props} />)
  }
}));

module.exports = BestCategoryMenu;
