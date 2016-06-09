import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';

import WidgetBox from '../../Components/WidgetBox';

import io from 'socket.io-client';

const WidgetContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [LoginStore, UserStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: UserStore.getState(),
    }
  }
}, React.createClass({
  render() {

    const { LoginStore, UserStore } = this.props;

    if (LoginStore.get('isLogin')) {
      var socket = io.connect('http://localhost:3001/noti');
      socket.emit('join_room');
      console.log('222222222222');

      socket.on('news', function (comment) {
        UserActions.increaseLevel();
      });
    }

    return (<WidgetBox {...this.props} />)
  }
}));

module.exports = WidgetContainer;
