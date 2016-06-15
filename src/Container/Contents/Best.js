import React from 'react';
import AltContainer from 'alt-container';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import BestPostStore from '../../Stores/BestPostStore';
import UserStore from '../../Stores/UserStore';
import GnbStore from '../../Stores/GnbStore';

import Best from '../../Components/Contents/Best';

const BestContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, BestPostStore, UserStore, GnbStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      BestPostStore: BestPostStore.getState(),
      UserStore: UserStore.getState(),
      GnbStore: GnbStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<Best {...this.props} />)
  }
}));

module.exports = BestContainer;
