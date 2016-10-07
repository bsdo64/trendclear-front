import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';
import Notis from '../../Stores/Domain/Notis';

import MyArea from '../../Components/MyArea';

import {Noti, Point} from '../../Utils/Socket';

const MyMenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, UserStore, Notis]
  },

  getPropsFromStores() {
    return {
      Notis: Notis.getState(),
      LoginStore: LoginStore.getState(),
      UserStore: UserStore.getState()
    }
  }
}, React.createClass({
  componentDidMount() {
    "use strict";

    const { LoginStore } = this.props;

    if (LoginStore.get('isLogin')) {
      Noti.emit('join_room');
      Point.emit('join_room');
    }

  },
  render() {
    return (<MyArea {...this.props} />)
  }
}));

module.exports = MyMenuContainer;
