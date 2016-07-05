import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginStore from '../../Stores/LoginStore';
import UserStore from '../../Stores/UserStore';
import ReportStore from '../../Stores/ReportStore';
import Posts from '../../Stores/Domain/Posts';

import ReportModalBox from '../../Components/ReportModalBox';

const ReportModalContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [Posts, LoginStore, UserStore, ReportStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: UserStore.getState(),
      ReportStore: ReportStore.getState(),
      Posts: Posts.getState()
    }
  }
}, React.createClass({
  render() {
    return (<ReportModalBox {...this.props} />)
  }
}));


module.exports = ReportModalContainer;
