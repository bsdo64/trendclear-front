import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';

import MyArea from '../../Components/MyArea';

import io from 'socket.io-client';

const MyMenuContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, UserStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: UserStore.getState()
    }
  }
}, React.createClass({
  componentDidMount() {
    "use strict";

    const { LoginStore } = this.props;

    if (LoginStore.get('isLogin')) {
      var socket = io.connect('http://localhost:3001/noti');
      socket.emit('join_room');
      console.log('222222222222');

      socket.on('news', function (comment) {
        UserActions.increaseLevel();
      });
    }

  },
  render() {
    return (<MyArea {...this.props} />)
  }
}));

module.exports = MyMenuContainer;
