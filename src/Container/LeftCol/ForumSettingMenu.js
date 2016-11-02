import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';

import GnbStore from '../../Stores/GnbStore';
import Forums from '../../Stores/Domain/Forums';
import CommunityStore from '../../Stores/CommunityStore';
import AuthStore from '../../Stores/UI/AuthStore';

import LeftMenu from '../../Components/ForumSettingLeftMenu';

const ForumSettingLeftMenu = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [GnbStore, CommunityStore, Forums, AuthStore]
  },

  getPropsFromStores() {
    return {
      GnbStore: GnbStore.getState(),
      CommunityStore: CommunityStore.getState(),
      Forums: Forums.getState(),
      AuthStore: AuthStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<LeftMenu {...this.props} />)
  }
}));

module.exports = ForumSettingLeftMenu;
