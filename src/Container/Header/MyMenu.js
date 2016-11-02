import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import LoginStore from '../../Stores/LoginStore';
import Notis from '../../Stores/Domain/Notis';
import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';

import MyArea from '../../Components/MyArea';

import {Noti, Point} from '../../Utils/Socket';

const MyMenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, Users, AuthStore, Notis]
  },

  getPropsFromStores() {
    return {
      Notis: Notis.getState(),
      LoginStore: LoginStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState())
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
