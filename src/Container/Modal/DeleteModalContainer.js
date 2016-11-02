import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'; import {getLoginUser} from '../Util/func';
import LoginStore from '../../Stores/LoginStore';
import RemoveModalStore from '../../Stores/UI/RemoveModalStore';
import Posts from '../../Stores/Domain/Posts';
import Comments from '../../Stores/Domain/Comments';
import SubComments from '../../Stores/Domain/SubComments';

import DeleteModalBox from '../../Components/DeleteModalBox';
import Users from '../../Stores/Domain/Users';
import AuthStore from '../../Stores/UI/AuthStore';

const ReportModalContainer = connectToStores({
  getStores() {
    // this will handle the listening/unlistening for you
    return [Posts, Comments, SubComments, LoginStore, Users, AuthStore, RemoveModalStore]
  },

  getPropsFromStores() {
    return {
      LoginStore: LoginStore.getState(),
      UserStore: getLoginUser(Users.getState(), AuthStore.getState()),
      RemoveModalStore: RemoveModalStore.getState(),
      Posts: Posts.getState(),
      Comments: Comments.getState(),
      SubComments: SubComments.getState(),
    }
  }
}, React.createClass({
  render() {
    return (<DeleteModalBox {...this.props} />)
  }
}));


module.exports = ReportModalContainer;
