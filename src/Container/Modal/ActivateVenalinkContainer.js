import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {getLoginUser} from '../Util/func';

import ActivateVenalink from '../../Components/Modal/Components/ActivateVenalink';

import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';
import ShareLinkStore from '../../Stores/UI/ShareLinkStore';

const ActivateVenalinkContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [ShareLinkStore,Users, AuthStore]
  },

  getPropsFromStores() {
    return {
      ShareLinkStore: ShareLinkStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState())
    }
  }
}, React.createClass({
  render() {
    return (<ActivateVenalink {...this.props} />)
  }
}));


module.exports = ActivateVenalinkContainer;
