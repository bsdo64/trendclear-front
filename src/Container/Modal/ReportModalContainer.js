import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import LoginStore from '../../Stores/LoginStore';
import ReportStore from '../../Stores/UI/ReportStore';
import Posts from '../../Stores/Domain/Posts';
import Comments from '../../Stores/Domain/Comments';
import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';
import SubComments from '../../Stores/Domain/SubComments';

import ReportModalBox from '../../Components/ReportModalBox';

const ReportModalContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [Posts, Comments, SubComments, LoginStore, ReportStore, AuthStore, Users]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
      ReportStore: ReportStore.getState(),
      Posts: Posts.getState(),
      Comments: Comments.getState(),
      SubComments: SubComments.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<ReportModalBox {...this.props} />)
  }
}));


module.exports = ReportModalContainer;
