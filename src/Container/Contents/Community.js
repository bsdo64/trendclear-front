import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import CommunityStore from '../../Stores/CommunityStore';

import Community from '../../Components/Contents/Community';

const CommunityContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, CommunityStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      CommunityStore: CommunityStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Community {...this.props} />)
  }
}));

module.exports = CommunityContainer;
