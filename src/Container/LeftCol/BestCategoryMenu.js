import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GnbStore from '../../Stores/GnbStore';
import UserStore from '../../Stores/UserStore';

import BestCategorySelect from '../../Components/BestCategorySelect';

const BestCategoryMenu = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, UserStore]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      UserStore: UserStore.getState(),
    }
  }
}, React.createClass({
  render() {
    return (
      <div>
        <BestCategorySelect {...this.props} />
      </div>
    )
  }
}));

module.exports = BestCategoryMenu;
