import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';

import AvatarImageModal from '../../Components/AvatarImageModal';
import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';

const AvatarImageContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [Users, AuthStore]
  },

  getPropsFromStores() {
    return {
      UserStore: getLoginUser(Users.getState(), AuthStore.getState())
    }
  }
}, React.createClass({
  render() {
    return (<AvatarImageModal {...this.props} />)
  }
}));


module.exports = AvatarImageContainer;
