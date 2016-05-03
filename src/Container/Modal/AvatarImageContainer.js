import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../../Stores/UserStore';

import AvatarImageModal from '../../Components/AvatarImageModal';

const AvatarImageContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [UserStore]
  },

  getPropsFromStores() {
    return {
      UserStore: UserStore.getState()
    }
  }
}, React.createClass({
  render() {
    return (<AvatarImageModal {...this.props} />)
  }
}));


module.exports = AvatarImageContainer;
