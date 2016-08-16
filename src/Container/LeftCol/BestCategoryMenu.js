import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GnbStore from '../../Stores/GnbStore';
import UserStore from '../../Stores/UserStore';
import Forums from '../../Stores/Domain/Forums';
import Collections from '../../Stores/Domain/Collections';

import BestCategorySelect from '../../Components/BestCategorySelect';

const BestCategoryMenu = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, UserStore, Forums, Collections]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      UserStore: UserStore.getState(),
      Forums: Forums.getState(),
      Collections: Collections.getState()
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
