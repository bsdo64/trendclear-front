import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';

import WidgetBox from '../../Components/WidgetBox';

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
    return (<WidgetBox {...this.props} />)
  }
}));

module.exports = WidgetContainer;
