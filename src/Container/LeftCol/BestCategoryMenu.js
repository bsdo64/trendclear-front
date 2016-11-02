import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import GnbStore from '../../Stores/GnbStore';
import Forums from '../../Stores/Domain/Forums';
import Collections from '../../Stores/Domain/Collections';
import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';

import BestCategorySelect from '../../Components/BestCategorySelect';

const BestCategoryMenu = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, Users, AuthStore, Forums, Collections]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
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
